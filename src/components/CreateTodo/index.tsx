import { useState, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import { todos } from 'store/Todos';

import { TodoInput } from './TodoInput';
import styles from './CreateTodo.module.scss';

export const CreateTodo = observer(() => {
  // const { addTodo } = todos;

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const onClick: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!title || !description) return;

    const todo = {
      title: title.current!.value,
      description: description.current!.value,
      status: false,
      id: uuid(),
    };
    // debugger;
    todos.addTodo(todo);

    e.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={onClick}>
      <div className={styles.container}>
        <TodoInput
          containerClass={styles.container__title}
          labelText="Title"
          labelClass={styles.label}
          Ref={title}
        />

        <TodoInput
          labelText="Description"
          labelClass={styles.label}
          Ref={description}
        />
      </div>

      <button type="submit" className={styles.btn}>
        Create
      </button>
    </form>
  );
});
