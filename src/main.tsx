import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LangProvider } from './i18n/LangContext'
import './styles/fonts.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <LangProvider>
        <App />
    </LangProvider>,
)
