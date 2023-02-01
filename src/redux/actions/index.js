export const LOGIN = 'LOGIN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SUCESS_REQUEST = 'SUCESS_REQUEST';

export const login = (payload) => ({ type: LOGIN, payload });

export const sucessRequest = (payload) => ({ type: SUCESS_REQUEST, payload });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(sucessRequest(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
