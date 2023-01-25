import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { todos as items } from '../../store/Todos';

import { TodoModal } from './Modals/TodoModal';
import { EditTodoModal } from './Modals/EditTodoModal';

import styles from './TodoList.module.scss';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
  checked: boolean;
  order: number;
};

interface ITodos {
  todos: TTodo[];
  checkedTodos: Set<string>;
  checkAll: boolean;
  setCheckAll: (value: boolean) => void;
  // setTodosOnPage: (value: TTodo[]) => void;
}

export const Todos = observer(
  ({ todos, checkedTodos, checkAll, setCheckAll }: ITodos) => {
    const { changeStatus, deleteTodo, checkTodo, getTodos, changeOrder } =
      items;

    const [isTodoModal, setTodoModal] = useState(false);
    const [isEditTodoModal, setEditTodoModal] = useState(false);
    const [todoId, setTodoId] = useState('');

    const onTodoClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetTag = target.tagName;
      const id = target.dataset.id as string;

      if (targetTag === 'INPUT') {
        if (target.dataset.checked) {
          return;
        }

        changeStatus(id);
        return;
      }

      if (targetTag === 'BUTTON') {
        if (target.textContent === 'Delete') {
          deleteTodo(id);
          return;
        } else if (target.textContent === 'Edit') {
          setTodoId(id);
          setEditTodoModal(!isEditTodoModal);
          return;
        }
      }

      setTodoId(id);
      setTodoModal(!isTodoModal);
    };

    const onCheck: React.ChangeEventHandler<HTMLInputElement> = e => {
      const checkedId = e.target.dataset.checked;
      if (checkedId) {
        // console.log(checkedTodos.has(checkedId));
        if (checkedTodos.has(checkedId)) {
          // console.log(checkedId + ' unchecked');
          checkedTodos.delete(checkedId);
          checkTodo(checkedId, false);
          setCheckAll(false);
          // console.log(checkedTodos);
          return;
        }
        // console.log(checkedId + ' checked');
        checkedTodos.add(checkedId);
        checkTodo(checkedId, true);
        if (checkedTodos.size === getTodos().length && getTodos().length) {
          setCheckAll(true);
        }
        // console.log(checkedTodos);
        return;
      }
    };

    const onTodoModalClose = () => {
      setTodoModal(!isTodoModal);
    };

    const onEditTodoModalClose = () => {
      setEditTodoModal(!isEditTodoModal);
    };

    const [currentTodo, setCurrentTodo] = useState<null | TTodo>(null);

    const onDragStart = (e: React.DragEvent<HTMLLIElement>, item: TTodo) => {
      console.log(toJS(item));
      setCurrentTodo(item);
    };

    const onDrop = (e: React.DragEvent<HTMLLIElement>, item: TTodo) => {
      e.preventDefault();
      // setTodosOnPage(
      // setDraggedTodos(
      todos.forEach(todo => {
        changeOrder(todo, item, currentTodo!);
      });
      // );
      console.log(toJS(item));
      console.log(todos);
    };

    return (
      <>
        <ul className={styles.todoList} onClick={onTodoClick}>
          {todos
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((item: TTodo) => (
              <li
                key={item.id}
                data-id={item.id}
                className={styles.li}
                draggable={true}
                onDragStart={e => {
                  onDragStart(e, item);
                }}
                onDragLeave={e => {
                  e.currentTarget.style.background = '#bfdbf7';
                }}
                onDragEnd={e => {
                  e.currentTarget.style.background = '#bfdbf7';
                }}
                onDragOver={e => {
                  e.preventDefault();
                  e.currentTarget.style.background = 'lightgray';
                }}
                onDrop={e => {
                  onDrop(e, item);
                  e.currentTarget.style.background = '#bfdbf7';
                }}
              >
                <p className={styles.container}>
                  <span>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className={styles.checkbox}
                      data-checked={item.id}
                      checked={checkAll ? true : item.checked}
                      onChange={onCheck}
                    />
                  </span>
                  <span>#{item.order}</span>
                  <span className={styles.containerTitle}>{item.title}</span>
                  <span>{item.description}</span>
                  <span className={styles.inputsContainer}>
                    <input
                      type="checkbox"
                      data-id={item.id}
                      className={styles.checkbox}
                    />
                  </span>

                  <button
                    type="button"
                    className={styles.btn}
                    data-id={item.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.btn}
                    data-id={item.id}
                  >
                    Delete
                  </button>
                </p>
              </li>
            ))}
        </ul>
        {isTodoModal && <TodoModal id={todoId} onClose={onTodoModalClose} />}
        {isEditTodoModal && (
          <EditTodoModal id={todoId} onClose={onEditTodoModalClose} />
        )}
      </>
    );
  }
);
