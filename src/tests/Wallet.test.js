import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import {
  DESCRIPTION_INPUT,
  TAG_INPUT,
  METHOD_INPUT,
  VALUE_INPUT,
  CURRENCY_INPUT,
  VALID_EMAIL,
  DELETE_BTN,
} from './helpers/constants';

const initialEntries = ['/carteira'];
const initialState = {
  user: {
    email: VALID_EMAIL,
  },
};

describe('Testa a página Wallet', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
  });

  it('Verifica se os inputs são renderizados', async () => {
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT);
    const tagInput = await screen.findByTestId(TAG_INPUT);
    const methodInput = await screen.findByTestId(METHOD_INPUT);
    const valueInput = await screen.findByTestId(VALUE_INPUT);
    const currencyInput = await screen.findByTestId(CURRENCY_INPUT);

    expect(descriptionInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
  });

  it('Verifica se o botão "Adicionar despesa" é renderizado', async () => {
    const button = await screen.findByText(/Adicionar despesa/i);
    expect(button).toBeInTheDocument();
  });

  it('Verifica se é possível remover despesas', async () => {
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT);
    const valueInput = await screen.findByTestId(VALUE_INPUT);

    userEvent.type(descriptionInput, 'teste');
    expect(descriptionInput).toHaveValue('teste');

    userEvent.type(valueInput, '50');
    expect(valueInput).toHaveValue(50);

    const button = await screen.findByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const table = await screen.findAllByRole('rowgroup');
    expect(table).toHaveLength(2);

    const removeButton = await screen.findByTestId(DELETE_BTN);
    expect(removeButton).toBeInTheDocument();
    userEvent.click(removeButton);
  });

  it('Verifica se as despesas são salvas na tabela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT);
    const valueInput = await screen.findByTestId(VALUE_INPUT);

    userEvent.type(descriptionInput, 'teste');
    expect(descriptionInput).toHaveValue('teste');

    userEvent.type(valueInput, '50');
    expect(valueInput).toHaveValue(50);

    const button = await screen.findByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(async () => {
      const table = await screen.findAllByRole('rowgroup');
      expect(table).toHaveLength(2);
    });
  });
});
