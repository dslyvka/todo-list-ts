import { makeAutoObservable } from 'mobx';
import { toJS } from 'mobx';

interface ITodo {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

class Todos {
  title = '';
  description = '';
  todos: ITodo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: ITodo) {
    this.todos.push(todo);
    console.log(toJS(this.todos));
  }

  changeStatus(id: string, status: boolean) {
    this.todos = this.todos.map((todo: ITodo) => {
      if (todo.id === id) todo.status = status;
      return todo;
    });
    console.log(toJS(this.todos));
  }

  getTodo(id: string): ITodo {
    const todo = this.todos.find(todo => todo.id === id)!;
    return todo;
  }
}

export default new Todos();
