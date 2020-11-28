import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Navigation from '../components/Navigation/Navigation';

describe('Component: Navigation', () => {
  test('renders content', () => {
    const component = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navigation = component.container.querySelector('#navigation');
    expect(navigation.querySelector('a')).toHaveAttribute('href', '/');
    expect(navigation).toHaveTextContent('Warehouse');
  });
});
