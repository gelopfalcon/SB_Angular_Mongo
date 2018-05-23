import { Action } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions'
import { Todo } from '../components/todo';

export interface State {
    todos: Todo[];
}

export const initialState: State = {
    todos : [],
}


export function todoReducer(state: State = initialState, action: todoActions.Actions): State {
    switch (action.type) {

        case todoActions.GET_TODOS_SUCCESS:
            // your action code here
            return  {
                ...state,
                todos : action.payload
            }

        case todoActions.CREATE_TODO_SUCCESS:

        const newTodos = state.todos;
        newTodos.unshift(action.payload.todo)

        return {
            ...state,
            todos : newTodos
        }

        case todoActions.DELETE_TODO_SUCCESS:

        const todosReduced = state.todos;
        
        return {
            ...state,
            todos : todosReduced.filter(todo => todo.id != action.payload)
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

//export const getTodos = (state: State) => state.todos;

