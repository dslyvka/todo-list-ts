import { useState } from 'react';

import { observer } from 'mobx-react-lite';

import { todos as items } from 'store/Todos';

import { Todos } from './Todos';
import { Header } from './Header';

import styles from './TodoList.module.scss';

export const TodoList = observer(() => {
  const [isSorted, setIsSorted] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const todos = items.searchAndSortTodos(searchValue, isSorted, isFiltered);

  return (
    <>
      <div className={styles.divContainer}>
        <Header
          onSort={setIsSorted}
          onSearch={setSearchValue}
          onFilter={setIsFiltered}
          searchValue={searchValue}
        />
        {todos.length ? <Todos todos={todos} /> : <p>No todos yet</p>}
      </div>
    </>
  );
});
