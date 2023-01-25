import { makeAutoObservable, toJS } from 'mobx';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
  checked: boolean;
  order: number;
  number: number;
};

interface ITodos {
  [id: string]: TTodo;
}

interface IEditTodo {
  title: string;
  description: string;
}

class Todos {
  todos: ITodos = {};

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (todo: TTodo) => {
    const { id } = todo;
    this.todos[id] = todo;
    // console.log(toJS(this.todos));
  };

  changeStatus = (id: string) => {
    this.todos[id].status = !this.todos[id].status;
  };

  changeOrder = (todo: TTodo, draggedTodo: TTodo, currentTodo: TTodo) => {
    if (todo.id === draggedTodo.id) {
      this.todos[todo.id] = { ...todo, order: currentTodo!.order };
    }
    if (todo.id === currentTodo!.id) {
      this.todos[todo.id] = { ...todo, order: draggedTodo.order };
    }
  };

  getTodo = (id: string) => {
    return this.todos[id];
  };

  getTodos = () => {
    return Object.values(this.todos);
  };

  deleteTodo = (id: string) => {
    delete this.todos[id];
  };

  editTodo = (id: string, todo: IEditTodo) => {
    this.todos[id] = { ...this.todos[id], ...todo };
  };

  checkTodo = (id: string, checked: boolean) => {
    this.todos[id] = { ...this.todos[id], checked };
  };

  searchTodos = (value: string) => {
    if (value) {
      const todos = this.getTodos();
      const filtered = todos.filter(todo => todo.title.includes(value));
      return filtered;
    }
    return this.getTodos();
  };

  getSortedTodos = (todos: TTodo[]) => {
    return todos.sort((a, b) => a.title.localeCompare(b.title));
  };

  getDoneTodos = (todos: TTodo[]) => {
    return todos.filter(todo => todo.status === true);
  };

  searchAndSortTodos = (value: string, sort?: boolean, filter?: boolean) => {
    const searchedTodos = this.searchTodos(value);
    if (sort && filter) {
      const sorted = this.getSortedTodos(searchedTodos);
      const filtered = this.getDoneTodos(sorted);
      return filtered;
    }
    if (filter) {
      const filtered = this.getDoneTodos(searchedTodos);
      return filtered;
    }
    if (sort) {
      const sorted = this.getSortedTodos(searchedTodos);
      return sorted;
    }
    return searchedTodos;
  };
}

export const todos = new Todos();
