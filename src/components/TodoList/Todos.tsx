import styles from './TodoList.module.scss';

import Modal from '../Modal/Modal';

import { useState } from 'react';

import { observer } from 'mobx-react-lite';
import items from '../../store/Todos';

const Todos = observer(() => {
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

  const onCheckboxClick = (id: string, e: React.MouseEvent) => {
    items.changeStatus(id, (e.currentTarget as HTMLInputElement).checked);
  };

  return (
    <>
      <ul className={styles.todoList}>
        {items.todos.map((item, index) => (
          <li key={item.id} onClick={e => onTodoClick(e, item.id)}>
            <p className={styles.container}>
              <span className={styles.span}>{index}</span>
              <span className={styles.span}>{item.title}</span>
              <span className={styles.span}>{item.description}</span>
              <span className={styles.span}>
                <input
                  type="checkbox"
                  onClick={e => {
                    onCheckboxClick(item.id, e);
                  }}
                />
              </span>
            </p>
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpen} onClose={onModalClose} id={todoId} />
    </>
  );
});

export default Todos;
