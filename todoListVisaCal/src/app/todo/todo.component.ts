import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todos: Todo[];
  @Input() editableTodo: Todo;
  @Output() onToggleTodoStatus = new EventEmitter<object>();
  @Output() onDeleteTodo = new EventEmitter<object>();
  @Output() onEditTodo = new EventEmitter<object>();
  @Output() onKeyboardUse = new EventEmitter<object>();

  tempVal = '';
  constructor() { }

  editTodo(todo: Todo, value: string): void {
    this.tempVal = value;
    this.onEditTodo.emit({todo: todo, value: value});
  }

  ngOnInit() {
  }

}
