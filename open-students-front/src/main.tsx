import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { IntlProvider } from "react-intl";
import spanishMessages from "./languages/es.json";
import englishMessages from "./languages/en.json";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const lang = navigator.language.split(/[-_]/)[0];
const messages = getMessages(lang);

function getMessages(lang: string) {
  switch (lang) {
    case "es":
      return spanishMessages;
    default:
      return englishMessages;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <IntlProvider locale={lang} messages={messages}>
          <App />
        </IntlProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
