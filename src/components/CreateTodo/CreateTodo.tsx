import TodoInput from './TodoInput';
import styles from './CreateTodo.module.scss';

import { observer } from 'mobx-react-lite';
import todos from '../../store/Todos';

import { v4 as uuid } from 'uuid';

import { useState } from 'react';

const CreateTodo = observer(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (!title || !description) return;

    const todo = {
      title,
      description,
      status: false,
      id: uuid(),
    };
    todos.addTodo(todo);
    
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <TodoInput
          containerClass={styles.container__title}
          labelText="Title"
          labelClass={styles.label}
          value={title}
          setValue={setTitle}
        />

        <TodoInput
          labelText="Description"
          labelClass={styles.label}
          value={description}
          setValue={setDescription}
        />
      </div>

      <button type="button" className={styles.btn} onClick={onClick}>
        Create
      </button>
    </form>
  );
});

export default CreateTodo;
