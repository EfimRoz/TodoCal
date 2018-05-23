import {Todo} from "./todo.model";

export class FinishEditEvent {
  todo: Todo;
  inputValue: string;

  constructor(todo: Todo, inputValue: string) {
    this.todo = todo;
    this.inputValue = inputValue;
  }
}
