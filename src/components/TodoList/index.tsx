import { useState } from 'react';

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
};

function sliceTodos(todos: TTodo[], page: number, todosPerPage: number) {
  return todos.slice((page - 1) * todosPerPage, page * todosPerPage);
}

export const TodoList = observer(() => {
  const [isSorted, setIsSorted] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const todos = items.searchAndSortTodos(searchValue, isSorted, isFiltered);

  const [todosPerPage, setTodosPerPage] = useState(5);
  const totalPageCount = Math.ceil(todos.length / todosPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const todosOnPage: TTodo[] = sliceTodos(todos, currentPage, todosPerPage);

  return (
    <>
      <div className={styles.divContainer}>
        <Header
          onSort={setIsSorted}
          onSearch={setSearchValue}
          onFilter={setIsFiltered}
          searchValue={searchValue}
        />
        {todosOnPage.length ? (
          <Todos todos={todosOnPage} />
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
