import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext.jsx'
import { store } from './ReduxToolkit/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </HashRouter>
)
