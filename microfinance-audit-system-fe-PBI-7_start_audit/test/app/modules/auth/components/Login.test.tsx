import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { Login } from '../../../../../src/app/modules/auth/components/Login';
import { login } from '../../../../../src/app/modules/auth/core/_requests';
import { setAuth } from '../../../../../src/app/modules/auth/core/AuthHelpers';
import { AuthInit, AuthProvider } from '../../../../../src/app/modules/auth/core/Auth';

jest.mock('../../../../../src/app/modules/auth/core/_requests', () => ({
    login: jest.fn(),
}))

jest.mock('../../../../../src/app/modules/auth/core/AuthHelpers', () => ({
    setAuth: jest.fn(() => {})
}))

jest.mock('../../../../../src/app/modules/auth/core/AuthHelpers', () => ({
    removeAuth: jest.fn(), 
    refreshAuth: jest.fn(),
    setAuth: jest.fn()
}));

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('Login test', () => {
    (login as jest.MockedFunction<typeof login>).mockRejectedValueOnce({
        response: {
          status: 401,
        },
    }).mockRejectedValueOnce({
        response: {
            status: 500,
        },
    }).mockResolvedValue({
        data: {
            access: 'access_token',
            refresh: 'refresh_token'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
    })

    let getByTestId: RenderResult['getByTestId']
    let getByRole: RenderResult['getByRole']
    let getByLabelText: RenderResult['getByLabelText']

    beforeEach(() => {
        ({ getByTestId, 
            getByRole, 
            getByLabelText} = render(
            <AuthProvider>
                <AuthInit>
                    <Login />
                </AuthInit>
            </AuthProvider>
            
        ));
    })

    afterEach(() => {
        cleanup()
    })

    test('initial status', () => {
        const status = getByTestId('form-status');
        expect(status).toHaveTextContent('Belum punya akun? Hubungi admin untuk keperluan pembuatan akun.')
    })

    test('401 unauthorized status', async () => {
        const usernameInput = getByLabelText('Username')
        const passwordInput = getByLabelText('Password')
        const button = getByRole('button');

        fireEvent.change(usernameInput, { target: { value: 'john.cena' } })
        fireEvent.change(passwordInput, { target: { value: 'teteretet' } })
        fireEvent.click(button);

        await waitFor(() =>{
            const status = getByTestId('form-status');
            expect(status).toHaveTextContent('Username atau Password salah')
        });
    })

    test('500 error status', async () => {
        const usernameInput = getByLabelText('Username')
        const passwordInput = getByLabelText('Password')
        const button = getByRole('button');

        fireEvent.change(usernameInput, { target: { value: 'john.cena' } })
        fireEvent.change(passwordInput, { target: { value: 'teteretet' } })
        fireEvent.click(button);

        await waitFor(() =>{
            const status = getByTestId('form-status');
            expect(status).toHaveTextContent('Terjadi kesalahan tak terduga, silahkan coba lagi')
        });
    })

    test('success login', async () => {
        const usernameInput = getByLabelText('Username')
        const passwordInput = getByLabelText('Password')
        const button = getByRole('button');

        fireEvent.change(usernameInput, { target: { value: 'validusername' } })
        fireEvent.change(passwordInput, { target: { value: 'validpassword' } })
        fireEvent.click(button);

        await waitFor(() =>{
            expect(setAuth).toHaveBeenCalled()
        });
    })
})