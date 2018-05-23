import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/todo.reducer';

export const getTodoState = createFeatureSelector<State>('todos');

export const getTodosSelector = createSelector(getTodoState, cartState => cartState.todos);