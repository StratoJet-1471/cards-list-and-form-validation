import React from 'react';
import { Provider } from 'react-redux';
import store from './react-redux-store/store';

import MainContainer from './Main/MainContainer';

function App() {

  return (
    <Provider store={store}>
      <MainContainer/>
    </Provider>
  );
}

export default App;
