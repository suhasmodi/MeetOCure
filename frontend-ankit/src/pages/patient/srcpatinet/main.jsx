import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppointmentProvider } from './context/AppointmentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppointmentProvider>
  
      <App />
    </AppointmentProvider>
  </BrowserRouter>
);
