import React from 'react';
import Routers from './Routers';
import { store } from './app/store';
import { Provider } from 'react-redux'

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Routers />
      </Provider>
    </React.Fragment >
  );
}

export default App;
