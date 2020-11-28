import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CustomTabs from '../components/Navigation/CustomTabs';

describe('Component: CustomTabs', () => {
  let component;
  let jackets;
  let shirts;
  let accessories;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <CustomTabs />
      </MemoryRouter>
    );
    jackets = component.queryByRole('tab', { name: 'jackets' });
    shirts = component.queryByRole('tab', { name: 'shirts' });
    accessories = component.queryByRole('tab', { name: 'accessories' });
  });

  test('renders tabs with appropriate link', () => {
    expect(jackets).toHaveAttribute('href', '/category/jackets');
    expect(shirts).toHaveAttribute('href', '/category/shirts');
    expect(accessories).toHaveAttribute('href', '/category/accessories');
  });

  test('renders tabs without active class', () => {
    expect(jackets).not.toHaveClass('Mui-selected');
    expect(shirts).not.toHaveClass('Mui-selected');
    expect(accessories).not.toHaveClass('Mui-selected');
  });

  test('set active class if link clicked', () => {
    expect(jackets).not.toHaveClass('Mui-selected');
    fireEvent.click(shirts);
    expect(shirts).toHaveClass('Mui-selected');
    expect(accessories).not.toHaveClass('Mui-selected');
  });
});
