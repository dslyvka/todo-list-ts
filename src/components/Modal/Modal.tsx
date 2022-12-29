import { todos } from 'store/Todos';

import styles from './Modal.module.scss';

interface IModal {
  onClose: () => void;

  id: string;
}

export const Modal = (props: IModal) => {
  const { onClose, id } = props;
  const todo = todos.getTodo(id);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.d}>Description:</p>
        <p>{todo.description}</p>
        <p className={styles.s}>
          Status:{' '}
          <span className={styles.status}>
            {todo.status ? 'done' : 'not ready'}
          </span>
        </p>
        <div className={styles.btn__container}>
          <button className={styles.btn} type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
