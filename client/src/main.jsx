import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
  import { ToastContainer } from 'react-toastify';
  import { startKeepAlive } from './utils/keepAlive';
  startKeepAlive(); 
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <App />
    <ToastContainer/>
  </StrictMode>
  </BrowserRouter>
)
