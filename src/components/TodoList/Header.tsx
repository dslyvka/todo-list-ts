import styles from './TodoList.module.scss';

interface IHeader {
  onSort: (value: boolean) => void;
  onSearch: (value: string) => void;
  onFilter: (value: boolean) => void;

  searchValue: string;
}

export const Header = ({
  onSort,
  onSearch,
  onFilter,
  searchValue,
}: IHeader) => {
  const onSortClick: React.MouseEventHandler<HTMLInputElement> = e => {
    onSort(e.currentTarget.checked);
  };

  const onFilterClick: React.MouseEventHandler<HTMLInputElement> = e => {
    onFilter(e.currentTarget.checked);
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

        <label htmlFor="Filter todos" className={styles.label}>
          Filter:
          <input
            type="checkbox"
            name="Filter todos"
            id=""
            onClick={onFilterClick}
          />
        </label>
      </div>

      <ul className={styles.header}>
        <li className={styles.header__item}>id</li>
        <li className={styles.header__item + ' ' + styles.label}>
          Title
          <input
            type="checkbox"
            name="Sort todos"
            className={styles.input}
            onClick={onSortClick}
          />
        </li>
        <li className={styles.header__item}>Description</li>
        <li className={styles.header__item}>Status</li>
      </ul>
    </div>
  );
};
