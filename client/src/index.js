import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={'/dashboard/*'} element={<Dashboard />} />
          <Route path={'/*'} element={<App />} />
        </Routes>
      </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
