import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import App from './App'; // Import the App component
import AddHabit from './components/AddHabit';// Import the SecondPage component
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <Routes>
        {/* Define the default route for App.js */}
        <Route path="/" element={<App />} />

        {/* Define the route for the SecondPage */}
        <Route path="/AddHabit" element={<AddHabit />} />
      </Routes>
    </BrowserRouter>

);

reportWebVitals();

