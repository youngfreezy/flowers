import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { store, persistor } from 'store/index';

import Loader from 'components/Loader';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader size={100} block />} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
