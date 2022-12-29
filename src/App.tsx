import { CreateTodo } from './components/CreateTodo';
import { TodoList } from './components/TodoList/';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <CreateTodo />
      <TodoList />
    </div>
  );
}

export default App;
