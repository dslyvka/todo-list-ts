import { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { todos as items } from 'store/Todos';

import { Todos } from './Todos';
import { Header } from './Header';
import { Pagination } from 'components/Pagination';

import styles from './TodoList.module.scss';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
  checked: boolean;
  order: number;
};

function sliceTodos(todos: TTodo[], page: number, todosPerPage: number) {
  return todos.slice((page - 1) * todosPerPage, page * todosPerPage);
}

export const TodoList = observer(() => {
  const [isSorted, setIsSorted] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const todos = items.searchAndSortTodos(searchValue, isSorted, isFiltered);
  const [checkedTodos, setCheckedTodos] = useState<Set<string>>(new Set());
  const [checkAll, setCheckAll] = useState(false);

  const [todosPerPage, setTodosPerPage] = useState(5);
  const totalPageCount = Math.ceil(todos.length / todosPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // const [todosOnPage, setTodosOnPage] = useState(
  //   sliceTodos(todos, currentPage, todosPerPage)
  // );
  const todosOnPage = sliceTodos(todos, currentPage, todosPerPage);

  // const todosOnPage: TTodo[] = sliceTodos(todos, currentPage, todosPerPage);
  console.log(todosOnPage);

  return (
    <>
      <div className={styles.divContainer}>
        <Header
          onSort={setIsSorted}
          onSearch={setSearchValue}
          onFilter={setIsFiltered}
          searchValue={searchValue}
          checkedTodos={checkedTodos}
          checkAll={checkAll}
          setCheckAll={setCheckAll}
        />
        {todosOnPage.length ? (
          <Todos
            checkedTodos={checkedTodos}
            todos={todosOnPage}
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            // setTodosOnPage={setTodosOnPage}
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
