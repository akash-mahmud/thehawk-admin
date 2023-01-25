import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './style/app.scss'
import './main.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.render(
  <React.StrictMode>


 <BrowserRouter>
      <Provider store={store}>
    <App />
        <ToastContainer />
    </Provider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


