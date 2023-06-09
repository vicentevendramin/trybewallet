export const LOGIN = 'LOGIN';
export const SUCESS_REQUEST = 'SUCESS_REQUEST';
export const GET_EXPENSES = 'GET_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const login = (payload) => ({ type: LOGIN, payload });

export const sucessRequest = (payload) => ({ type: SUCESS_REQUEST, payload });

export const getExpenses = (payload) => ({ type: GET_EXPENSES, payload });

export const editExpenses = (payload) => ({ type: EDIT_EXPENSES, payload });

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(sucessRequest(currencies));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function fetchExpenses(expenses) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      expenses.exchangeRates = data;
      dispatch(getExpenses(expenses));
    } catch (error) {
      console.log(error.message);
    }
  };
}
