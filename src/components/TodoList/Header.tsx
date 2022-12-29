import styles from './TodoList.module.scss';

export const Header = () => (
  <div className={styles.div__container}>
    <ul className={styles.header}>
      <li className={styles.header__item}>id</li>
      <li className={styles.header__item}>Title</li>
      <li className={styles.header__item}>Description</li>
      <li className={styles.header__item}>Status</li>
    </ul>
  </div>
);
