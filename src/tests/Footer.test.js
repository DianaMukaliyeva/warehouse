import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Component: Footer', () => {
  test('it should contain a link', () => {
    const component = render(<Footer />);

    const link = component.container.querySelector('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('github'));
    expect(component.container).toHaveTextContent(
      'Reaktor assignment for Junior Developer, Spring 2021'
    );
  });
});
