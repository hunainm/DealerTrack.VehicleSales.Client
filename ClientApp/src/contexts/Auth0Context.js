import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import { Auth0Client } from '@auth0/auth0-spa-js';
import SplashScreen from 'src/components/SplashScreen';
import { auth0Config } from 'src/config';

let auth0Client = null;

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'Auth0',
  loginWithPopup: () => Promise.resolve(),
  logout: () => { },
  getToken: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const loginWithPopup = async (options) => {
    await auth0Client.loginWithPopup(options);

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      var accessToken = await auth0Client.getTokenSilently();
      localStorage.setItem("accessToken",accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            id: user.sub,
            avatar: user.picture,
            email: user.email,
            name: user.name,
            tier: 'Client'
          }
        }
      });
    }
  };

  const logout = () => {
    auth0Client.logout();

    dispatch({
      type: 'LOGOUT'
    });
  };

  const getToken = async () => {
    return await auth0Client.getTokenSilently();
  }

  useEffect(() => {
    const initialise = async () => {
      try {
        auth0Client = new Auth0Client({
          redirect_uri: window.location.origin,
          ...auth0Config
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          var accessToken = await auth0Client.getTokenSilently();
      localStorage.setItem("accessToken",accessToken);
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated,
              user: {
                id: user.sub,
                avatar: user.picture,
                email: user.email,
                name: user.name,
                tier: 'Client'
              }
            }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'Auth0',
        loginWithPopup,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;