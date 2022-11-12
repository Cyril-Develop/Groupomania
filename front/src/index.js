import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import App from './App';
import { AuthContextProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
	<AuthContextProvider>
    	<App />
	</AuthContextProvider>
  </React.StrictMode>
);
