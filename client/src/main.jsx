import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,

    style: {
      background: "#ffffff",
      color: "#1e293b",
      border: "1px solid #e2e8f0",
      padding: "16px",
      borderRadius: "14px",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: "15px",
    },

    success: {
      iconTheme: {
        primary: "#2563eb",
        secondary: "#ffffff",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>

    <App />

  </React.StrictMode>,
)