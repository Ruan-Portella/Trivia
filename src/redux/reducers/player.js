import { ADD_USER, ADD_SCORE, REMOVE_SCORE,
  NEW_SETTINGS, REMOVE_SETTINGS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  amount: 5,
  type: '',
  category: '',
  difficulty: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + 1,
    };
  case REMOVE_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case NEW_SETTINGS:
    return {
      ...state,
      amount: action.payload.amount,
      type: action.payload.type,
      category: action.payload.category,
      difficulty: action.payload.difficulty,
    };
  case REMOVE_SETTINGS:
    return {
      ...state,
      amount: 5,
      tyoe: '',
      category: '',
      difficulty: '',
    };
  default:
    return state;
  }
};

export default player;
