import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { BrowserRouter } from "react-router-dom";
import { rollbarConfig } from "./rollbar.js";
import store from "./slices/index.js";
import App from "./App.jsx";
import resources from "./locales/index.js";

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
    debug: true,
  });

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <BrowserRouter>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </RollbarProvider>
    </Provider>
  );
};

export default init;
