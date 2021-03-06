import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import {App} from './App';
import {rootReducer} from './redux/rootReducer';
import {watchLoadDialogs} from './redux/dialogs/sagas';
import {watchLoadContacts} from './redux/contacts/sagas';
import {watchLoadMessages} from './redux/messages/sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(watchLoadDialogs);
sagaMiddleware.run(watchLoadMessages);
sagaMiddleware.run(watchLoadContacts);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
