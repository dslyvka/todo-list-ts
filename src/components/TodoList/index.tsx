import { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { todos as items } from 'store/Todos';

import { Todos } from './Todos';
import { Header } from './Header';
import { Pagination } from 'components/Pagination';

import { sliceTodos } from 'utils/sliceTodos';

import styles from './TodoList.module.scss';

export const TodoList = observer(() => {
  const [isSorted, setIsSorted] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const todos = items.searchAndSortTodos(searchValue, isSorted);

  const [todosPerPage, setTodosPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPageCount = Math.ceil(todos.length / todosPerPage);

  const [checkedCounter, setCheckedCounter] = useState(0);
  const [checkAll, setCheckAll] = useState(false);

  const [checkAction, setCheckAction] = useState(Symbol('action'));
  const [uncheckAction, setUncheckAction] = useState(Symbol('action'));
  const [deleteCheckedAction, setDeleteCheckedAction] = useState(
    Symbol('action')
  );
  const [dropAction, setDropAction] = useState(Symbol('action'));
  const [editTodoAction, setEditTodoAction] = useState(Symbol('action'));

  const [todosOnPage, setTodosOnPage] = useState(
    sliceTodos(todos, currentPage, todosPerPage)
  );

  useEffect(() => {
    if (isFiltered) {
      setTodosOnPage(
        sliceTodos(todos, currentPage, todosPerPage).filter(
          todo => todo.status === true
        )
      );
      return;
    }
    setTodosOnPage(sliceTodos(todos, currentPage, todosPerPage));
  }, [
    todosPerPage,
    todos.length,
    currentPage,
    checkAction,
    uncheckAction,
    checkAll,
    deleteCheckedAction,
    isFiltered,
    dropAction,
    editTodoAction,
  ]);

  useEffect(() => {
    let count = 0;

    setCheckedCounter(0);
    setCheckAll(false);

    for (let i = 0; i < todosOnPage.length; i++) {
      if (todosOnPage[i].checked) count++;
    }
    if (count === todosOnPage.length && checkedCounter > 0) setCheckAll(true);
    else setCheckAll(false);
    setCheckedCounter(count);
  }, [
    currentPage,
    todosPerPage,
    deleteCheckedAction,
    checkAction,
    uncheckAction,
    todosOnPage,
  ]);

  useEffect(() => {
    if (checkedCounter) {
      setCheckedCounter(checkedCounter - 1);
    }
  }, [uncheckAction]);

  useEffect(() => {
    // console.log('check');
    if (checkedCounter < todosOnPage.length) {
      setCheckedCounter(checkedCounter + 1);
    }
  }, [checkAction]);

  return (
    <>
      <div className={styles.divContainer}>
        <Header
          onSort={setIsSorted}
          onSearch={setSearchValue}
          onFilter={setIsFiltered}
          searchValue={searchValue}
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          todosOnPage={todosOnPage}
          checkedCounter={checkedCounter}
          setDeleteCheckedAction={setDeleteCheckedAction}
          setCheckedCounter={setCheckedCounter}
        />
        {todosOnPage.length ? (
          <Todos
            todos={todosOnPage}
            setCheckAll={setCheckAll}
            setCheckAction={setCheckAction}
            setUncheckAction={setUncheckAction}
            setDropAction={setDropAction}
            setEditTodoAction={setEditTodoAction}
          />
        ) : (
          <p>No todos yet</p>
        )}
        {todosOnPage.length ? (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setTodosPerPage={setTodosPerPage}
            todosPerPage={todosPerPage}
            totalPageCount={totalPageCount}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
});
