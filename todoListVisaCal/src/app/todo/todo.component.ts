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
  @Output() onToggleTodoStatus = new EventEmitter<string>();
  @Output() onDeleteTodo = new EventEmitter<string>();
  @Output() onEditTodo = new EventEmitter<FinishEditEvent>();
  @Output() onTodoEdition = new EventEmitter<string>();
  @Output() onFinishEditingTodo = new EventEmitter<string>();
  @Output() onSaveTodos = new EventEmitter<void>();

  tempVal = '';


  constructor() { }
  ngOnInit() {}


  editTodo(todo: Todo, value: string): void {
    this.tempVal = value;
    const finishEditEvent = new FinishEditEvent(todo.id, value);
    this.onEditTodo.emit(finishEditEvent);
  }

  checkFinishEditing(event: KeyboardEvent, content: string): void {
    if (event.code === 'Enter') {
      this.onFinishEditingTodo.emit(content);
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
    this.onToggleTodoStatus.emit(todo.id);
  }

}
