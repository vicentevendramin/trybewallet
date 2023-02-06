import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

import {
  VALUE_INPUT,
  DESCRIPTION_INPUT,
  TOTAL_FIELD,
  VALID_EMAIL,
} from './helpers/constants';

const initialEntries = ['/carteira'];
const initialState = {
  user: {
    email: VALID_EMAIL,
  },
};

describe('Testa o componente Header da Wallet', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
  });

  it('Renderiza o título "TrybeWallet"', async () => {
    const title = await screen.getByRole('heading', {
      name: /trybewallet/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se o email está no Header', async () => {
    const email = await screen.getByText(VALID_EMAIL);
    expect(email).toBeInTheDocument();
  });

  it('Verifica se o valor das despesas sé 0', async () => {
    const expenses = await screen.findByTestId(TOTAL_FIELD);
    expect(expenses).toHaveTextContent('0');
  });

  it('Verifica se o valor das despesas é alterado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT);
    const valueInput = await screen.findByTestId(VALUE_INPUT);
    const addButton = await screen.findByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(descriptionInput, 'TrybeWallet');
    userEvent.type(valueInput, '100');

    act(() => {
      userEvent.click(addButton);
    });

    await waitFor(() => {
      const expenses = screen.findByTestId(TOTAL_FIELD);
      expect(expenses.value).not.toBe('0');
    });
  });
});
