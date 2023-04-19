export const ADD_USER = 'ADD_USER';

export const addUserAction = (name, email) => ({
  type: ADD_USER,
  payload: {
    name,
    email,
  },
});
