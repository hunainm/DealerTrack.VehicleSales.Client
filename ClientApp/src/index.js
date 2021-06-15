import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import * as serviceWorker from 'src/serviceWorker';
import App from './App';

enableES5();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.register();
