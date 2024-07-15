import './index.css'

import App from './App.jsx'
import ErrorBoundary from './utility/ErrorBoudary/ErrorBoundary.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
        <App />
  </ErrorBoundary>


)
