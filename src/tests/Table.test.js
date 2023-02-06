import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { VALID_EMAIL } from './helpers/constants';

const initialEntries = ['/carteira'];

const initialState = {
  user: {
    email: VALID_EMAIL,
  },
};

describe('Testa o componente Table', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
  });

  it('Testa se o botão "Adicionar despesa" funciona', async () => {
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(addButton);

    const expenseButton = screen.queryByRole('button', { name: 'Editar despesa' });
    expect(expenseButton).not.toBeInTheDocument();

    const editButton = await screen.findByRole('button', { name: 'Editar' });
    userEvent.click(editButton);

    const editExpenseButton = screen.getByRole('button', { name: 'Editar despesa' });
    expect(editExpenseButton).toBeInTheDocument();
  });
});
