import {Component, OnInit} from '@angular/core';
import {TodoService} from './todo/todo.service';
import {Todo} from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private todos: Todo[];
  private editableTodo: Todo;

  constructor(){}

  ngOnInit() {
    this.loadTodoList();
  }

  loadTodoList(): void {
    this.todos = TodoService.loadTodos();
  }

  getTodos(): Todo[] {
    if (!this.todos) {
      // Generating example todo list for first time user
      this.todos = TodoService.generateGenericTodoList();
    }
      return this.todos;
  }

  onAddTodo(todoName: string): void {
    TodoService.addTodoObject(this.todos, todoName);
  }

  onToggleTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;
    this.saveTodos();
  }

  onDeleteTodoRequest(todo: Todo): void {
    TodoService.deleteTodo(this.todos, todo);
  }

  onEditTodoInit(todo: Todo): void {
      const inputValue = todo.value;
      this.editableTodo = TodoService.editTodo(this.editableTodo, todo, inputValue);
  }

  updateEditableTodo(inputValue: string): void {
    this.editableTodo.value = inputValue;
    this.saveTodos();
  }

  saveTodos(): void {
    TodoService.saveTodos(this.todos);
  }

  getEditableTodo(): Todo {
    return this.editableTodo;
  }
}
