import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

console.log( 'todos', todoList.todos );

// const tarea = new Todo('Aprender JavaScript!!');

// todoList.nuevoTodo( tarea );

// console.log( todoList );

// crearTodoHtml( tarea );

// // Agrega un elemento en el local o session storage
// localStorage.setItem('my-key', 'abc123');
// sessionStorage.setItem('my-key', 'def123');

// Remueve un elemento del local o session storage
//localStorage.removeItem('my-key');
