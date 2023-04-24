export const ADD_USER = 'ADD_USER';
export const ADD_SCORE = 'ADD_SCORE';
export const REMOVE_SCORE = 'REMOVE_SCORE';
export const NEW_SETTINGS = 'NEW_SETTINGS';

export const addUserAction = (name, email) => ({
  type: ADD_USER,
  payload: {
    name,
    email,
  },
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});

export const removeScore = () => ({
  type: REMOVE_SCORE,
});

export const newSettings = (amount, category, difficulty, type) => ({
  type: NEW_SETTINGS,
  payload: {
    amount,
    category,
    difficulty,
    type,
  },
});
