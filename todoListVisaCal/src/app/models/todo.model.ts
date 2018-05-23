export class Todo {
  id: string;
  value: string;
  creationTime: Date;
  isComplete: boolean;

  constructor( id: string, value: string, creationTime: Date, isComplete: boolean) {
    this.id = id;
    this.value = value;
    this.creationTime = creationTime;
    this.isComplete = isComplete;
  }
}
