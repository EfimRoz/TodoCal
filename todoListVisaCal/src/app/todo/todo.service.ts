import { Injectable } from '@angular/core';
import {Todo} from '../models/todo.model';

const LOCAL_STORAGE_TODOS = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[];
  private editableTodo: Todo;

  constructor() {
    this.todos = this.loadTodos();
  }

    addTodoObject(todoName: string): void {
      const todo: Todo = this.buildTodoObject(todoName);
      this.todos.push(todo);
      this.saveTodos(this.todos);
    }

    buildTodoObject(todoName: string): Todo {
      const todo: Todo = { id: this.generateId(), name: todoName, creationTime: new Date(), isComplete: false};
      return todo;
    }

    toggleTodoStatus(todo): void {
      // changing todo status
      todo.isComplete = !todo.isComplete;
      this.saveTodos(this.todos);
    }

    getTodos(): Todo[] {
      if (this.todos) {
        return this.todos;
      } else {
        this.todos = [ new Todo(this.generateId(), 'example', new Date(), false)];
        return this.todos;
      }
    }

    saveTodos(todos: Todo[]): void {
      localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
    }

    loadTodos(): Todo[] {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    }

    generateId(): string {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);
    }

    deleteTodo(todoToFind: Todo): void {
      const idx: number = this.todos.findIndex( todo => todo === todoToFind )
      this.todos.splice(idx, 1);
      this.saveTodos(this.todos);
    }

    editTodo(todo: Todo, value: string): void {
      if (this.editableTodo === todo) {
        todo.name = value;
        this.editableTodo = null;
      } else {
        this.editableTodo = todo;
      }
    }

    updateEditableTodo(value: string): void{
      this.editableTodo.name = value;
      this.saveTodos(this.todos);
    }

    stopEditingTodo(value: string): void {
      this.editableTodo.name = value;
      this.editableTodo = null;
      this.saveTodos(this.todos);
    }

    getEditableTodo(): Todo {
      return this.editableTodo;
    }
}
