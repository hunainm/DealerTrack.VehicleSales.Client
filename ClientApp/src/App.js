import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import { SnackbarProvider } from 'notistack';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import { AuthProvider } from 'src/contexts/Auth0Context';
import { createTheme } from 'src/theme';
import routes, { renderRoutes } from 'src/routes';

const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

const App = () => {

  const theme = createTheme({
    direction: 'ltr',
    responsiveFontSizes: true,
    theme: "LIGHT"
  });

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
          <SnackbarProvider
            dense
            maxSnack={3}
          >
            <Router history={history}>
              <AuthProvider>
                <GlobalStyles />
                {renderRoutes(routes)}
              </AuthProvider>
            </Router>
          </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
