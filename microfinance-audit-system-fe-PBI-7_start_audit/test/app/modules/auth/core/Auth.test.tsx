import React from 'react';
import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';
import { AuthProvider, AuthInit } from '../../../../../src/app/modules/auth/core/Auth';
import { useSelector, Provider } from 'react-redux';
import { persistor, store } from '../../../../../src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { setAuth, removeAuth, refreshAuth } from '../../../../../src/app/modules/auth/core/AuthHelpers';
import { refreshToken } from '../../../../../src/app/modules/auth/core/_requests';
import { AxiosResponse } from 'axios';

jest.mock('../../../../../src/app/modules/auth/core/AuthHelpers', () => ({
  removeAuth: jest.fn(), 
  refreshAuth: jest.fn(),
}));

jest.mock('../../../../../src/app/modules/auth/core/_requests', () => ({
  refreshToken: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Auth', () => {

  beforeEach(() => {
    const mockRefreshTokenResponse = {
      data: {
        access: 'new_access_token',
      },
      status: 200,
    } as AxiosResponse<{ access: string; }, any>;
    (refreshToken as jest.MockedFunction<typeof refreshToken>).mockResolvedValue(mockRefreshTokenResponse);
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('logout when catch error during refresh token', async() => {
    const accessExp = Date.now() / 1000 - 3600
    const refreshExp = Date.now() / 1000 + 86400
    const authState = { 
      access: { 
        token: 'access_token',
        exp: accessExp 
      }, 
      refresh: { 
        token: 'refresh_token', 
        exp: refreshExp 
      }
    };
    
    const mockedSelector = useSelector as jest.MockedFunction<typeof useSelector>;
    mockedSelector.mockReturnValue(authState);

    (refreshToken as jest.MockedFunction<typeof refreshToken>).mockRejectedValueOnce(undefined)

    const { getByText } = render(
      <AuthProvider>
        <AuthInit>
          halo dunyah
        </AuthInit>
      </AuthProvider>
    )
    
    // Wait for the splash screen to disappear
    await waitFor(() => expect(getByText('halo dunyah')).toBeInTheDocument())

    // Ensure refreshToken and refreshAuth are not called
    expect(removeAuth).toHaveBeenCalled()
    expect(refreshAuth).not.toHaveBeenCalled()
    expect(refreshToken).toHaveBeenCalled()
    
  })

  test('logout when auth is not present', async() => {
    const mockedSelector = useSelector as jest.MockedFunction<typeof useSelector>;
    mockedSelector.mockReturnValue(undefined);
    
    const { getByText } = render(
      <AuthProvider>
        <AuthInit>
          halo dunyah
        </AuthInit>
      </AuthProvider>
    )

    // Wait for the splash screen to disappear
    await waitFor(() => expect(getByText('halo dunyah')).toBeInTheDocument())

    // Ensure refreshToken and refreshAuth are not called
    expect(removeAuth).toHaveBeenCalled()
    expect(refreshAuth).not.toHaveBeenCalled()
    expect(refreshToken).not.toHaveBeenCalled()
    
  })

  test('renders children when auth is present and tokens are not expired', async() => {
    const accessExp = Date.now() / 1000 + 3600 // 1 hour from now
    const refreshExp = Date.now() / 1000 + 86400 // 1 day from now
    const authState = { 
      access: { 
        token: 'access_token',
        exp: accessExp 
      }, 
      refresh: { 
        token: 'refresh_token', 
        exp: refreshExp 
      }
    };
    
    const mockedSelector = useSelector as jest.MockedFunction<typeof useSelector>;
    mockedSelector.mockReturnValue(authState);

    const { getByText } = render(
      <AuthProvider>
        <AuthInit>
          halo dunyah
        </AuthInit>
      </AuthProvider>
    )

    // Wait for the splash screen to disappear
    await waitFor(() => expect(getByText('halo dunyah')).toBeInTheDocument())

    // Ensure refreshToken and refreshAuth are not called
    expect(removeAuth).not.toHaveBeenCalled()
    expect(refreshAuth).not.toHaveBeenCalled()
    expect(refreshToken).not.toHaveBeenCalled()
    
  })

  test('renders children when auth is present but access token is expired', async() => {
    const accessExp = Date.now() / 1000 - 3600 // 1 hour from now
    const refreshExp = Date.now() / 1000 + 86400 // 1 day from now
    const authState = { 
      access: { 
        token: 'access_token',
        exp: accessExp 
      }, 
      refresh: { 
        token: 'refresh_token', 
        exp: refreshExp 
      }
    };
    
    const mockedSelector = useSelector as jest.MockedFunction<typeof useSelector>;
    mockedSelector.mockReturnValue(authState);

    const { getByText } = render(
      <AuthProvider>
        <AuthInit>
          halo dunyah
        </AuthInit>
      </AuthProvider>
    )
    
    // Wait for the splash screen to disappear
    await waitFor(() => expect(getByText('halo dunyah')).toBeInTheDocument())

    // Ensure refreshToken and refreshAuth are not called
    expect(removeAuth).not.toHaveBeenCalled()
    expect(refreshAuth).toHaveBeenCalled()
    expect(refreshToken).toHaveBeenCalled()
    
  })

  test('renders children when auth is present but access and refresh token is expired', async() => {
    const accessExp = Date.now() / 1000 - 86400
    const refreshExp = Date.now() / 1000 - 3600
    const authState = { 
      access: { 
        token: 'access_token',
        exp: accessExp 
      }, 
      refresh: { 
        token: 'refresh_token', 
        exp: refreshExp 
      }
    };
    
    const mockedSelector = useSelector as jest.MockedFunction<typeof useSelector>;
    mockedSelector.mockReturnValue(authState);

    const { getByText } = render(
      <AuthProvider>
        <AuthInit>
          halo dunyah
        </AuthInit>
      </AuthProvider>
    )
    
    // Wait for the splash screen to disappear
    await waitFor(() => expect(getByText('halo dunyah')).toBeInTheDocument())

    // Ensure refreshToken and refreshAuth are not called
    expect(removeAuth).toHaveBeenCalled()
    expect(refreshAuth).not.toHaveBeenCalled()
    expect(refreshToken).not.toHaveBeenCalled()
    
  })

});