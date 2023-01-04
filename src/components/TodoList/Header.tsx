import { debounce } from 'components/utils/debounce';

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

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 50);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.currentTarget.value);
  };

  return (
    <div className={styles.divContainer}>
      <div className={styles.inputsContainer}>
        <label htmlFor="Search todos" className={styles.label}>
          Search todos:
        </label>
        <input
          type="text"
          name="Search todos"
          className={styles.input}
          // onChange={e => {
          //   debounce(() => {
          //     onSearch(e.currentTarget.value);
          //   }, 50)();
          // }}
          onChange={onChange}
          value={searchValue}
        />

        <label htmlFor="Filter todos" className={styles.label}>
          Show done todos:
          <input
            type="checkbox"
            name="filter todos"
            id=""
            onClick={onFilterClick}
            className={styles.checkbox}
          />
        </label>
      </div>

      <ul className={styles.header}>
        <li>id</li>
        <li className={styles.label}>
          Title
          <input
            type="checkbox"
            name="sort todos"
            className={styles.checkbox}
            onClick={onSortClick}
          />
        </li>
        <li>Description</li>
        <li>Status</li>
      </ul>
    </div>
  );
};
