import { useState} from 'react';

import { observer } from 'mobx-react-lite';

import { todos as items } from 'store/Todos';

import { Todos } from './Todos';
import { Header } from './Header';

import styles from './TodoList.module.scss';

export const TodoList = observer(() => {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const todos = items.searchTodos(searchValue);
  const sortedTodos = items.getSortedTodos();
  const sortedAndFilteredTodos = items.getSortedAndFilteredTodos(searchValue);

  return (
    <>
      <div className={styles.div__container}>
        <Header
          onSort={setIsSorted}
          onSearch={setSearchValue}
          searchValue={searchValue}
        />
        {todos.length ? (
          <Todos
            todos={
              isSorted
                ? searchValue
                  ? sortedAndFilteredTodos
                  : sortedTodos
                : todos
            }
          />
        ) : (
          <p>No todos yet</p>
        )}
      </div>
    </>
  );
});
