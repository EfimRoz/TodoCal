import { Component } from '@angular/core';
import {TodoService} from './todo/todo.service';
import {Todo} from './models/todo.model';
import {FinishEditEvent} from "./models/finish-edit-event.model";

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
  editTodo(finishEditEvent: FinishEditEvent): void {
    // editing an todo item
    this.todoService.editTodo(finishEditEvent.todo, finishEditEvent.inputValue);
  }
  // !IMPORTANT find the right type
  updateEditableTodo(inputValue: string): void {
      this.todoService.updateEditableTodo(inputValue);
  }
}
