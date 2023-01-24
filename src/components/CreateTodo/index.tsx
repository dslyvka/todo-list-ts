import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { todos } from 'store/Todos';

import { Input } from 'components/Input';

import styles from './CreateTodo.module.scss';

export const CreateTodo = observer(() => {
  const { addTodo } = todos;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const title = form.get('title') as string;
    const description = form.get('description') as string;

    if (!title || !description) return;

    const todo = {
      title,
      description,
      status: false,
      id: uuid(),
      checked: false,
    };

    addTodo(todo);

    e.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.container}>
        <Input
          containerClass={styles.containerInputTitle}
          labelText="Title"
          inputName="title"
        />
        <Input labelText="Description" inputName="description" />
      </div>

      <button type="submit" className={styles.btn}>
        Create
      </button>
    </form>
  );
});
