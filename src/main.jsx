import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider  } from 'react-redux'
import {Wrap} from '@/components/ui/provider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Wrap>
          <Provider store={store}>
              <App />
          </Provider>
    </Wrap>
  </StrictMode>,
)
