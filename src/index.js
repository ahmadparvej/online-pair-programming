import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div>
      <Toaster position='top-center' toastOptions={{
        success: {
          theme: {
            primary: "#4aed88"
          }
        }
      }}></Toaster>
    </div>
      <App />
  </>
);

