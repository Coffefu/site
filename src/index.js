import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { PopupProvider } from 'react-hook-popup';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
