import { makeAutoObservable } from 'mobx';
import { toJS } from 'mobx';

type TTodo = {
  title: string;
  description: string;
  status: boolean;
  id: string;
};

interface ITodo {
  [id: string]: TTodo;
}

class Todos {
  todos: ITodo = {};

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: TTodo) {
    const { id } = todo;
    this.todos[id] = todo;
    console.log(todo);
    console.log(toJS(this.todos));
  }

  changeStatus(id: string) {
    this.todos[id].status = !this.todos[id].status;
    console.log(toJS(this.todos));
  }

  getTodo(id: string): TTodo {
    return this.todos[id];
  }

  deleteTodo(id: string) {
    delete this.todos[id];
  }
}

export const todos = new Todos();
