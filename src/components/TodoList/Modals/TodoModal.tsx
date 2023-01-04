import { todos } from 'store/Todos';

import { Modal } from 'components/Modal';

import styles from './TodoModal.module.scss';

interface ITodoModal {
  id: string;

  onClose: () => void;
}

export const TodoModal = ({ id, onClose }: ITodoModal) => {
  const { getTodo } = todos;
  const todo = getTodo(id);

  return (
    <Modal onClose={onClose}>
      <div>
        <h2 className={styles.title}>{todo.title}</h2>
        <p className={styles.descriptionTitle}>Description:</p>
        <p>{todo.description}</p>
        <p className={styles.statusTitle}>
          Status:
          <span className={styles.status}>
            {todo.status ? ' done' : ' not ready'}
          </span>
        </p>
      </div>
    </Modal>
  );
};
