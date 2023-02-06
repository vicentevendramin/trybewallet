import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  EMAIL_INPUT,
  PASSWORD_INPUT,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './helpers/constants';

let rendered;

describe('Testa o sistema de login da aplicação', () => {
  beforeEach(() => {
    rendered = renderWithRouterAndRedux(<App />);
  });

  it('Testa a função de login da página com email e senha válidos', () => {
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });

  it('Testa a função de login da página com email e senha inválidos', () => {
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  it('Verifica se o estado é alterado quando passado um email e senha válidos', () => {
    const button = screen.getByRole('button');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(button);

    const { store } = rendered;

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });
});
