import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

