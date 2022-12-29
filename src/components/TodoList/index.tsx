import { observer } from 'mobx-react-lite';

import { todos as items } from 'store/Todos';

import { Todos } from './Todos';
import { Header } from './Header';

import styles from './TodoList.module.scss';

export const TodoList = observer(() =>
  Object.values(items.todos).length ? (
    <div className={styles.div__container}>
      <Header />
      <Todos todos={Object.values(items.todos)} />
    </div>
  ) : (
    <p>No todos yet</p>
  )
);
