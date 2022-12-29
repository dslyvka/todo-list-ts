import { useState } from 'react';

import { todos as items } from '../../store/Todos';

import { Modal } from '../Modal/Modal';

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

export const Todos = ({ todos }: ITodos) => {
  const [isOpen, openModal] = useState(false);
  const [todoId, setTodoId] = useState('');

  const onTodoClick = (e: React.MouseEvent, id: string) => {
    const input = (e.target as HTMLInputElement).tagName;
    if (input === 'INPUT') return;

    console.log('Click');
    setTodoId(id);
    openModal(!isOpen);
    console.log(e.target);
  };

  const onModalClose = () => {
    openModal(!isOpen);
  };

  const onCheckboxClick = (id: string) => {
    items.changeStatus(id);
  };

  return (
    <>
      <ul className={styles.todoList}>
        {todos.map((item: TTodo, index: number) => (
          <li key={item.id} onClick={e => onTodoClick(e, item.id)}>
            <p className={styles.container}>
              <span className={styles.span}>#{index+1}</span>
              <span className={styles.span}>{item.title}</span>
              <span className={styles.span}>{item.description}</span>
              <span className={styles.span}>
                <input
                  type="checkbox"
                  onClick={() => {
                    onCheckboxClick(item.id);
                  }}
                />
              </span>
            </p>
          </li>
        ))}
      </ul>
      {isOpen && <Modal id={todoId} onClose={onModalClose} />}
    </>
  );
};

export default Todos;
