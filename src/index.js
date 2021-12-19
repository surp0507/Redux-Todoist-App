import React from 'react';
import ReactDom from 'react-dom'
import { App } from './App';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {store} from './Redux/store/index'


ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
 );
