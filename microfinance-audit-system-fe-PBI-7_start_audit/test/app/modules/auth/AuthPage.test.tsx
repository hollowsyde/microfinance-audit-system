import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthPage } from "../../../../src/app/modules/auth/AuthPage";

describe('AuthPage', () => {
  test('renders Login when route is undefined', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AuthPage />
      </MemoryRouter>
    );
    const element = screen.getByRole('button');
    expect(element.id).toEqual("kt_sign_in_submit")
  });

  test('renders Login when route is /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthPage />
      </MemoryRouter>
    );
    const element = screen.getByRole('button');
    expect(element.id).toEqual("kt_sign_in_submit")
  });

});