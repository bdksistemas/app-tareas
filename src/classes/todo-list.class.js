import { Todo } from ".";

export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarLocalST(); 
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalST();
    }

    eliminarTodo( id ) {
        
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalST();

    }

    marcarCompletado( id ) {

        for( const todo of this.todos ) {

            if( todo.id == id ) {
                todo.completado = !todo.completado;
                this.guardarLocalST();
                break;
            }
        }

    }
    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalST();

    }

    guardarLocalST() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) );

    }

    cargarLocalST() {

        this.todos = (localStorage.getItem('todo')) 
                    ? this.todos = JSON.parse(localStorage.getItem('todo')) 
                    : [];
        
        this.todos = this.todos.map( Todo.fromJson );
    }

};

