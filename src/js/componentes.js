import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${ todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
};

// EVENTOS

txtInput.addEventListener('keyup', (event ) => {

    // console.log( event );   // De esta forma puedo saber el valor de la tecla presionada, propiedad keycode

    if ( event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoID            = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')) { // clic en el input (check)

        todoList.marcarCompletado( todoID );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button')) {    // click en el botón de la x
        
        todoList.eliminarTodo( todoID );
        divTodoList.removeChild( todoElemento );

    };

    console.log( todoList );
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    // Haremos un arreglo inverso, del final al inicio 
    for( let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        };

    };

});

ulFiltros.addEventListener('click', (event) => {
    // console.log( event.target.text );

    const filtro = event.target.text;
    if( !filtro ) { return; };

    anchorFiltros.forEach( e => e.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {

            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }
                break;

                case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;            
        }
        
    }
})