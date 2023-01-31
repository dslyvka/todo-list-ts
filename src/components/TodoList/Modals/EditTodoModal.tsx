import { todos } from 'store/Todos';

import { Modal } from 'components/Modal';

import styles from './EditTodoModal.module.scss';

interface IEditTodoModal {
  id: string;

  onClose: () => void;
  setEditTodoAction: (action: symbol) => void;
}

export const EditTodoModal = ({
  id,
  onClose,
  setEditTodoAction,
}: IEditTodoModal) => {
  const { getTodo, editTodo } = todos;
  const todo = getTodo(id);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const title = form.get('title') as string;
    const description = form.get('description') as string;

    editTodo(id, { title, description });
    setEditTodoAction(Symbol('action'));
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={todo.title}
            className={styles.input}
          />

          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <input
            type="text"
            name="description"
            defaultValue={todo.description}
            className={styles.input}
          />

          <div className={styles.btnContainer}>
            <button type="submit" className={styles.btn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
