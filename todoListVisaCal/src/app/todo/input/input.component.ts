import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() onAddTodo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  addInput(val: string) {
    this.onAddTodo.emit(val);
  }

}
