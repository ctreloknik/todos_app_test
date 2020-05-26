import { createSelector } from 'reselect';

export const getLoginInfo = (state) => {
  return {
    login: state.login.login,
    password: state.login.password
  }
};

export const getLoginPasswordFilledSelector = createSelector(
  [getLoginInfo], (item) => {
    return !!(item.login && item.password)
  }
);