import { TTodo } from 'types/Todo';

export const sliceTodos = function sliceTodos(
  todos: TTodo[],
  page: number,
  todosPerPage: number
) {
  return todos.slice((page - 1) * todosPerPage, page * todosPerPage);
};
