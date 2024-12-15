import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import AuthenticationContextProvider from "./components/company/Contexts/AuthenticationContext.tsx";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string | null = null;
  const localStorageInfo = localStorage.getItem("AuthUser");
  if (localStorageInfo) {
    const userDetails = JSON.parse(localStorageInfo);
    token = userDetails?.token ?? null;
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: offsetLimitPagination(["searchTerm"]),
        },
      },
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthenticationContextProvider>
        <App />
        <ToastContainer />
      </AuthenticationContextProvider>
    </ApolloProvider>
  </StrictMode>
);
