export class FinishEditEvent {
  todoId: string;
  inputValue: string;

  constructor(todoId: string, inputValue: string) {
    this.todoId = todoId;
    this.inputValue = inputValue;
  }
}
