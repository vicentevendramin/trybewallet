import { SUCESS_REQUEST, GET_EXPENSES, DELETE_EXPENSE, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case FAILED_REQUEST:
    return console.log(action.error.message);
  default:
    return state;
  }
};

export default wallet;
