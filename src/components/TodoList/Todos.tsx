import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { todos as items } from '../../store/Todos';

import { TodoModal } from './Modals/TodoModal';
import { EditTodoModal } from './Modals/EditTodoModal';

import styles from './TodoList.module.scss';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
};

interface ITodos {
  todos: TTodo[];
}

export const Todos = observer(({ todos }: ITodos) => {
  const { changeStatus, deleteTodo } = items;

  const [isTodoModal, setTodoModal] = useState(false);
  const [isEditTodoModal, setEditTodoModal] = useState(false);
  const [todoId, setTodoId] = useState('');

  const onTodoClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetTag = target.tagName;
    const id = target.dataset.id as string;

    if (targetTag === 'INPUT') {
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

  const onTodoModalClose = () => {
    setTodoModal(!isTodoModal);
  };

  const onEditTodoModalClose = () => {
    setEditTodoModal(!isEditTodoModal);
  };

  return (
    <>
      <ul className={styles.todoList} onClick={onTodoClick}>
        {todos.map((item: TTodo, index: number) => (
          <li key={item.id} data-id={item.id}>
            <p className={styles.container}>
              <span>#{index + 1}</span>
              <span className={styles.containerTitle}>{item.title}</span>
              <span>{item.description}</span>
              <span className={styles.inputsContainer}>
                <input
                  type="checkbox"
                  data-id={item.id}
                  className={styles.checkbox}
                />
              </span>

              <button type="button" className={styles.btn} data-id={item.id}>
                Edit
              </button>
              <button type="button" className={styles.btn} data-id={item.id}>
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
});

export default Todos;
