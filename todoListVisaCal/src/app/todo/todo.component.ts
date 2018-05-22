import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../models/todo.model';
import {TodoService} from "./todo.service";
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
  @Output() onEditTodo = new EventEmitter<FinishEditEvent>();
  @Output() onTodoEdition = new EventEmitter<string>();

  tempVal = '';
  constructor( private todoService: TodoService) { }

  editTodo(todo: Todo, value: string): void {
    this.tempVal = value
    const finishEditEvent = new FinishEditEvent(todo, value);
    this.onEditTodo.emit(finishEditEvent);
  }
  checkFinishEditing(event: KeyboardEvent, content: string): void {
    if (event.code === 'Enter') {
      // this.updateEditableTodo(event, content);
      this.todoService.finishEditingTodo(content);
      event.preventDefault();
    }
  }

  updateEditableTodo(content: string): void {
    this.onTodoEdition.emit(content);
  }
  ngOnInit() {
  }

}
