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
  order: number = 1;
  number: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setOrder = (order: number) => {
    this.order = order;
  };

  getOrder = () => {
    return this.order;
  };

  setNumber = (number: number) => {
    this.number = number;
  };

  getNumber = () => {
    return this.number;
  };

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
    this.getTodos().forEach((todo, index, array) => {
      if (index + 1 !== this.todos[todo.id].number) {
        this.todos[todo.id] = { ...this.todos[todo.id], number: index + 1 };
      }
      if (index + 1 !== this.todos[todo.id].order) {
        this.todos[todo.id] = { ...this.todos[todo.id], order: index + 1 };
      }
      // if (index + 1 === array.length) {
      //   this.setOrder(index + 2);
      //   this.setNumber(index + 2);
      // }
    });
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

  searchAndSortTodos = (value: string, sort?: boolean) => {
    const searchedTodos = this.searchTodos(value);
    if (sort) {
      const sorted = this.getSortedTodos(searchedTodos);
      return sorted;
    }
    return searchedTodos;
  };
}

export const todos = new Todos();
