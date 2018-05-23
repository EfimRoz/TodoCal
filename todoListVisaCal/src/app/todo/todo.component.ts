import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../models/todo.model';
import {FinishEditEvent} from "../models/finish-edit-event.model";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() editableTodo: Todo;
  @Output() onToggleTodoStatus = new EventEmitter<Todo>();
  @Output() onDeleteTodo = new EventEmitter<Todo>();
  @Output() onEditTodo = new EventEmitter<Todo>();
  @Output() onTodoEdition = new EventEmitter<string>();
  @Output() onFinishEditingTodo = new EventEmitter<string>();
  @Output() onSaveTodos = new EventEmitter<void>();

  tempVal = '';


  constructor() { }
  ngOnInit() {}


  editTodo(todo: Todo): void {
    this.tempVal = todo.value;
    this.onEditTodo.emit(todo);
  }

  checkFinishEditing(event: KeyboardEvent, todo: Todo): void {
    if (event.code === 'Enter') {
      this.editTodo(todo);
      event.preventDefault();
    }
  }

  updateEditableTodo(content: string): void {
    this.onTodoEdition.emit(content);
  }

  formatTime(date: Date): string{
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Adding a 0 for a single char minutes for the globally accepted format.
    const strMinutes: string = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    return `${hours}:${strMinutes}`;
  }

  toggleTodoStatus(todo): void {
    this.onToggleTodoStatus.emit(todo);
  }

}
