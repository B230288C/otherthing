import React from 'react';
import { createRoot } from 'react-dom/client';
import AppointmentForm from './Components/AppointmentForm';

function App() {
  return <AppointmentForm />;
}

createRoot(document.getElementById('app')).render(<App />);
