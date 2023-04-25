import '@/styles/globals.css';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
