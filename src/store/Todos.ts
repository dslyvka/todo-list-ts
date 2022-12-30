import { makeAutoObservable } from 'mobx';

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
  }

  changeStatus(id: string) {
    this.todos[id].status = !this.todos[id].status;
  }

  getTodo(id: string): TTodo {
    return this.todos[id];
  }

  getTodos() {
    return Object.values(this.todos);
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

  getSortedTodos(todos: TTodo[]) {
    return todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  getDoneTodos(todos: TTodo[]) {
    return todos.filter(todo => todo.status === true);
  }

  searchAndSortTodos(value: string, sort?: boolean, filter?: boolean) {
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
  }
}

export const todos = new Todos();
