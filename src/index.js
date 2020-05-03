import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Venda from './venda/venda';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/venda" component={Venda} exact />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();