import React from 'react';
import Routers from './Routers';
import { store } from './app/store';
import { Provider } from 'react-redux'
import { StoreContextProvider } from './Context/Store'

function App() {
  return (
    <React.Fragment>
      <StoreContextProvider>
      <Provider store={store}>
        <Routers />
      </Provider>
      </StoreContextProvider>
    </React.Fragment >
  );
}

export default App;
