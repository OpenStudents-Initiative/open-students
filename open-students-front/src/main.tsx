import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { IntlProvider } from 'react-intl';
import spanishMessages from './languages/es.json';
import englishMessages from './languages/en.json';

const lang = navigator.language.split(/[-_]/)[0];
let messages = getMessages(lang);

function getMessages(lang: string) {
    switch (lang) {
        case 'es':
            return spanishMessages;
        default:
            return englishMessages;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IntlProvider locale={lang} messages={messages}>
            <App />
        </IntlProvider>
    </React.StrictMode>,
)
