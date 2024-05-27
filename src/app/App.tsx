import { Provider } from "react-redux";
import "./app.scss";
import 'sweetalert2/dist/sweetalert2.min.css';
import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import store from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "@config/graphql";
import "@utils/moment"
import {IntlProvider} from 'react-intl'
import frMessages from '@shared/i18n/lang/fr.json'
function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <IntlProvider locale={'fr'} messages={frMessages}>
        <RouterProvider router={router} />
        </IntlProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
