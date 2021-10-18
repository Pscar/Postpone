import React from 'react';
import Routers from './Routers';
import { StoreContextProvider } from './Context/Store'

function App() {
  return (
    <React.Fragment>
      <StoreContextProvider>
        <Routers />
      </StoreContextProvider>
    </React.Fragment >
  );
}

export default App;
