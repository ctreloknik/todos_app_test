import { createSelector } from 'reselect';

export const getItems = (state) => state.todos.elementsList;

export const getTodosSelector = createSelector(
    [ getItems ],
    (items) => {
      return items;
    }
  );