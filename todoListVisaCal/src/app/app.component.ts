import {Component, OnInit} from '@angular/core';
import {TodoService} from './todo/todo.service';
import {Todo} from './models/todo.model';
import {FinishEditEvent} from "./models/finish-edit-event.model";

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

  onToggleTodoStatus(todoId: string): void {
    //changing todo complete status
    const todoIndex = TodoService.findTodoIndex(this.todos, todoId);
    if( todoIndex in this.todos) {
      const todo = this.todos[todoIndex];
      this.toggleTodoStatus(todo);
    } else {
      console.error('Invalid todo id for status toggle was received');
    }
  }

  toggleTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;
    this.saveTodos();
  }

  onDeleteTodoRequest(id: string): void {
    const todoDeleteIndex = TodoService.findTodoIndex(this.todos, id);
    if( todoDeleteIndex in this.todos) {
      const todoToDelete = this.todos[todoDeleteIndex];
      this.deleteTodo(todoToDelete);
    }
    else {
      console.error('Invalid id for deletion was received');
    }
  }

  deleteTodo(todoToDelete: Todo): void {
    TodoService.deleteTodo(this.todos, todoToDelete);
  }

  onEditTodoInit(finishEditEvent: FinishEditEvent): void {
    const todoToEditIndex = TodoService.findTodoIndex( this.todos, finishEditEvent.todoId);
    if( todoToEditIndex in this.todos) {
      const todo = this.todos[todoToEditIndex];
      this.editTodo(todo, finishEditEvent.inputValue);
    } else {
      console.log('Invalid todo id was received was edit initiation ');
    }
  }

  editTodo(todo, inputValue): void {
    // editing an todo item
    this.editableTodo = TodoService.editTodo(this.editableTodo, todo, inputValue);
  }

  finishEditingTodo(value: string): void {
    this.editableTodo.name = value;
    this.editableTodo = null;
    this.saveTodos();
  }

  updateEditableTodo(inputValue: string): void {
    this.editableTodo.name = inputValue;
    this.saveTodos();
  }

  saveTodos(): void {
    TodoService.saveTodos(this.todos);
  }

  getEditableTodo(): Todo {
    return this.editableTodo;
  }
}
