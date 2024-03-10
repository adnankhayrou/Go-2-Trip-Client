import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/Routes/App'
import {DataProvider} from './components/Context/DataProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
