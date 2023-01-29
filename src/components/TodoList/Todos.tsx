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
  number: number;
};

interface ITodos {
  todos: TTodo[];

  setCheckAll: (value: boolean) => void;
  setCheckAction: (value: symbol) => void;
  setUncheckAction: (value: symbol) => void;
}

export const Todos = observer(
  ({ todos, setCheckAll, setCheckAction, setUncheckAction }: ITodos) => {
    const {
      changeStatus,
      deleteTodo,
      checkTodo,
      getTodo,
      changeOrder,
      getOrder,
      getNumber,
      setOrder,
      setNumber,
    } = items;

    const [isTodoModal, setTodoModal] = useState(false);
    const [isEditTodoModal, setEditTodoModal] = useState(false);
    const [todoId, setTodoId] = useState('');

    const onCheck = (checkedId: string) => {
      checkTodo(checkedId, !getTodo(checkedId).checked);
      if (getTodo(checkedId).checked) setCheckAction(Symbol('action'));
      else {
        setUncheckAction(Symbol('action'));
        setCheckAll(false);
      }
      return;
    };

    const onTodoClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetTag = target.tagName;
      const id = target.dataset.id as string;

      if (targetTag === 'INPUT' && target.dataset.checked) {
        onCheck(target.dataset.checked);
        return;
      }

      if (targetTag === 'INPUT') {
        changeStatus(id);
        return;
      }

      if (targetTag === 'BUTTON') {
        if (target.textContent === 'Delete') {
          deleteTodo(id);
          setOrder(getOrder() - 1);
          setNumber(getNumber() - 1);
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
      todos.forEach(todo => {
        changeOrder(todo, item, currentTodo!);
      });
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
                      checked={item.checked}
                      readOnly={true}
                    />
                  </span>
                  <span>#{item.number}</span>
                  <span className={styles.containerTitle}>{item.title}</span>
                  <span>{item.description}</span>
                  <span className={styles.inputsContainer}>
                    <input
                      type="checkbox"
                      data-id={item.id}
                      className={styles.checkbox}
                      checked={item.status}
                      readOnly={true}
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
