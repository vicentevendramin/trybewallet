import { SUCESS_REQUEST, GET_EXPENSES, EDIT_EXPENSES } from '../actions';

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
  case EDIT_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
