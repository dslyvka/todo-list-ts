import Todos from "./Todos";
import styles from "./TodoList.module.scss";

import { observer } from "mobx-react-lite";
import items from "../../store/Todos";

const TodoList = observer(() =>
  items.todos.length ? (
    <>
      <ul className={styles.header}>
        <li className={styles.header__item}>id</li>
        <li className={styles.header__item}>Title</li>
        <li className={styles.header__item}>description</li>
        <li className={styles.header__item}>Status</li>
      </ul>
      <Todos />
    </>
  ) : (
    <p>No todos yet</p>
  )
);

export default TodoList;
