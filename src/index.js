import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

import { createStore } from 'redux';
import { pricesReducer } from './redux/reducer.js';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(pricesReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
 </Provider>,
  document.querySelector('#app')
);