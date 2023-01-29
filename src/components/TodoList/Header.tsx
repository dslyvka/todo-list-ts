import { useMemo, useCallback, useState, useEffect } from 'react';

import { todos as items } from '../../store/Todos';

import { debounce } from 'components/utils/debounce';

import styles from './TodoList.module.scss';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
  checked: boolean;
  order: number;
  number: number;
};

interface IHeader {
  onSort: (value: boolean) => void;
  onSearch: (value: string) => void;
  onFilter: (value: boolean) => void;
  setCheckAll: (value: boolean) => void;
  setDeleteCheckedAction: (value: symbol) => void;
  setCheckedCounter: (value: number) => void;

  searchValue: string;
  checkAll: boolean;
  todosOnPage: TTodo[];
  checkedCounter: number;
}

export const Header = ({
  onSort,
  onSearch,
  onFilter,
  searchValue,
  checkAll,
  todosOnPage,
  checkedCounter,
  setCheckAll,
  setDeleteCheckedAction,
  setCheckedCounter,
}: IHeader) => {
  const {
    getTodos,
    deleteTodo,
    checkTodo,
    setNumber,
    setOrder,
    getOrder,
    getNumber,
  } = items;

  const [styleTag, setStyleTag] = useState(styles.headerNoChecked);

  useEffect(() => {
    if (checkedCounter === todosOnPage.length && checkedCounter > 0) {
      setStyleTag(styles.headerCheckAll);
      setCheckAll(true);
    } else if (checkedCounter < todosOnPage.length && checkedCounter > 0) {
      setStyleTag(styles.headerCheckSome);
    } else {
      setStyleTag(styles.headerNoChecked);
    }
  }, [checkedCounter, todosOnPage.length]);

  const onDeleteAll = () => {
    setStyleTag(styles.headerNoChecked);
    setCheckAll(false);
    getTodos().forEach(todo => {
      deleteTodo(todo.id);
    });
    setOrder(1);
    setNumber(1);
    setCheckedCounter(0);
  };

  const onDeleteChecked = () => {
    setStyleTag(styles.headerNoChecked);
    setCheckAll(false);
    setDeleteCheckedAction(Symbol('action'));
    todosOnPage.forEach(todo => {
      if (todo.checked) deleteTodo(todo.id);
    });
    setOrder(getOrder() - checkedCounter);
    setNumber(getNumber() - checkedCounter);
    setCheckedCounter(0);
  };

  const onCheckAll: React.MouseEventHandler<HTMLInputElement> = e => {
    if (!e.currentTarget.checked) {
      setCheckAll(e.currentTarget.checked);
      setStyleTag(styles.headerNoChecked);
      todosOnPage.forEach(todo => {
        checkTodo(todo.id, false);
      });
      setCheckedCounter(0);
      console.log('checkAll');
      return;
    }
    setCheckAll(e.currentTarget.checked);
    setStyleTag(styles.headerCheckAll);
    todosOnPage.forEach(todo => {
      checkTodo(todo.id, true);
    });
    console.log('checkAll');
  };

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

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onSearch(event.target.value);
  // };

  // const debouncedChangeHandler = useMemo(() => {
  //   return debounce(changeHandler, 300);
  // }, []);

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onSearch(event.target.value);
  // };
  // const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div className={styles.divContainer}>
      <div className={styles.inputsContainer}>
        <div>
          <button
            className={styles.btn}
            onClick={onDeleteChecked}
            disabled={!checkedCounter ? true : false}
          >
            Delete checked
          </button>
          <button
            className={styles.btn}
            style={{ marginRight: '5px' }}
            onClick={onDeleteAll}
            disabled={getTodos().length ? false : true}
          >
            Delete all
          </button>
        </div>
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
          // onKeyDown={onChange}
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
        <li>
          <div className={styleTag}>
            <input
              type="checkbox"
              onClick={onCheckAll}
              disabled={getTodos().length ? false : true}
              checked={checkAll}
            />
          </div>
        </li>
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
