import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
};

interface ITodos {
  [id: string]: TTodo;
}

class Todos {
  todos: ITodos = {};

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: TTodo) {
    const { id } = todo;
    this.todos[id] = todo;
    // console.log(todo);
    // console.log(toJS(this.todos));
  }

  changeStatus(id: string) {
    this.todos[id].status = !this.todos[id].status;
    // console.log(toJS(this.todos));
  }

  getTodo(id: string): TTodo {
    return this.todos[id];
  }

  deleteTodo(id: string) {
    delete this.todos[id];
  }

  searchTodos(value: string) {
    if (value) {
      const todos = this.getTodos();
      const filtered = todos.filter(todo => todo.title.includes(value));
      return filtered;
    }
    return this.getTodos();
  }

  getSortedTodos() {
    const todos = this.getTodos();
    return todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  getSortedAndFilteredTodos(value: string) {
    const todos = this.searchTodos(value);
    todos.sort((a, b) => a.title.localeCompare(b.title));
    return todos.filter(todo => todo.title.includes(value));
  }

  getTodos() {
    return Object.values(this.todos);
  }
}

export const todos = new Todos();
