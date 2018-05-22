import { Component } from '@angular/core';
import {TodoService} from './todo/todo.service';
import {Todo} from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent {

  constructor(
    private todoService: TodoService
  ){}

  // todos: Todo[] = this.todoService.getTodos();
  onAddTodo(todoName: string): void {
    this.todoService.addTodoObject(todoName);
  }

  onToggleTodoStatus(todo: Todo): void {
    //changing todo complete status
    this.todoService.toggleTodoStatus(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }
  // !IMPORTANT
  editTodo(payload): void {
    // editing an todo item
    this.todoService.editTodo(payload.todo, payload.value);
  }
  // !IMPORTANT find the right type
  handleKeyboardEvent(input): void {
    if (input.key.code === 'Enter') {
      this.todoService.stopEditingTodo(input.value);
      input.key.preventDefault();
    } else {
      this.todoService.updateEditableTodo(input.value)
    }
  }
}
