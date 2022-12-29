import styles from './TodoList.module.scss';

interface IHeader {
  onSort: (b: boolean) => void;
  onSearch: (value: string) => void;

  searchValue: string;
}

export const Header = ({ onSort, onSearch, searchValue }: IHeader) => {
  const onClick: React.MouseEventHandler<HTMLInputElement> = e => {
    onSort(e.currentTarget.checked);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onSearch(e.currentTarget.value);
  };

  return (
    <div className={styles.div__container}>
      <div className={styles.inputsContainer}>
        <label htmlFor="Search todos" className={styles.label}>
          Search todos:
        </label>
        <input
          type="text"
          name="Search todos"
          className={styles.input}
          onChange={onChange}
          value={searchValue}
        />

        <label htmlFor="Sort todos" className={styles.label}>
          Sort todos:
          <input
            type="checkbox"
            name="Sort todos"
            className={styles.input}
            onClick={onClick}
          />
        </label>
      </div>

      <ul className={styles.header}>
        <li className={styles.header__item}>id</li>
        <li className={styles.header__item}>Title</li>
        <li className={styles.header__item}>Description</li>
        <li className={styles.header__item}>Status</li>
      </ul>
    </div>
  );
};
