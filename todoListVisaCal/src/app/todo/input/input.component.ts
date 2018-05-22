import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() onAddTodo = new EventEmitter<string>();
  @ViewChild('inputField') inputField:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addInput(val: string) {
    this.inputField.nativeElement.value = '';
    this.onAddTodo.emit(val);
  }

}
