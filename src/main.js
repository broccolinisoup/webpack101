import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

window.onload = () => {
    ReactDOM.render((<BrowserRouter><App/></BrowserRouter>), document.getElementById('main'))
};
