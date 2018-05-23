import {Todo} from '../models/todo.model';

export abstract class TodoService {
  static LOCAL_STORAGE_TODOS = 'todos';

  static loadTodos(): Todo[] {
    const todos = JSON.parse(localStorage.getItem(TodoService.LOCAL_STORAGE_TODOS));
    todos.forEach( todo =>{
      todo.creationTime = new Date(todo.creationTime);
    });
    return todos;
  }

  static addTodoObject(todos: Todo[], todoName: string): void {
    const todo: Todo = TodoService.buildTodoObject(todoName);
    todos.push(todo);
    TodoService.saveTodos(todos);
  }

  static buildTodoObject(todoName: string): Todo {
    const newTodo: Todo = new Todo( TodoService.generateId(), todoName, new Date() ,false);
    return newTodo;
  }


  static saveTodos(todos: Todo[]): void {
    localStorage.setItem(TodoService.LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }

  static generateGenericTodoList(): Todo[] {
    return [ new Todo(TodoService.generateId(), 'This is example todo', new Date(), false)];
  }

  static generateId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal. although in production I would use some uuid library just in case.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  static deleteTodo(todos: Todo[], todoToFind: Todo): void {
    const idx: number = todos.findIndex( todo => todo.id === todoToFind.id );
    todos.splice(idx, 1);
    TodoService.saveTodos(todos);
  }

  static editTodo(editableTodo, todo: Todo, value: string): Todo {
    let newEditableTodo: Todo;
    if (editableTodo === todo) {
      todo.name = value;
      newEditableTodo = null;
    } else {
      newEditableTodo = todo;
    }
    return newEditableTodo;
  }

}
