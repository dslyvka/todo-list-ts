import styles from './Modal.module.scss';

import items from '../../store/Todos';

interface IModal {
  isOpen: boolean;
  onClose: () => void;

  id: string;
}

const Modal = (props: IModal) => {
  const { isOpen, onClose, id } = props;
  const todo = items.getTodo(id);

  if (!isOpen) return <></>;

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
export default Modal;

