import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <BrowserRouter >
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
  //  </React.StrictMode>
);
