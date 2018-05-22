export class Todo {
  id: string;
  name: string;
  creationTime: Date;
  isComplete: boolean;

  constructor( id: string, name: string, creationTime: Date, isComplete: boolean) {
    this.id = id;
    this.name = name;
    this.creationTime = creationTime;
    this.isComplete = isComplete;
  }
}
