import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  DESCRIPTION_INPUT,
} from './helpers/constants';

describe('Testa a função de editar a Wallet', () => {
  it('Testa se é possível editar um gasto', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: 'tryber@betrybe.com',
        },
      },
    });

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.type(descriptionInput, 'pc gamer');
    userEvent.click(addButton);

    const editButton = await screen.findByRole('button', { name: 'Editar' });
    userEvent.click(editButton);

    const descriptionEdit = screen.getByTestId(DESCRIPTION_INPUT);
    const editFormButton = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.type(descriptionEdit, 'pc não tão gamer');
    userEvent.click(editFormButton);

    const description = await screen.findAllByAltText('pc não tão gamer');
    exepect(description).toBeInTheDocument();
  });
});
