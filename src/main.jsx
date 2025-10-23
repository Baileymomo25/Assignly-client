import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

console.log('React is loading...')

try {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  console.log('Root element found:', document.getElementById('root'))
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  
  console.log('App rendered successfully')
} catch (error) {
  console.error('Error rendering app:', error)
}