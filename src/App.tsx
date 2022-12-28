import styles from './App.module.scss';

import CreateTodo from './components/CreateTodo/CreateTodo';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className={styles.app}>
      <CreateTodo />
      <TodoList />
    </div>
  );
}

export default App;
