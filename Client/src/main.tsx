import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App.tsx";
import AuthenticationContextProvider from "./components/company/Contexts/AuthenticationContext.tsx";

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
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </ApolloProvider>
  </StrictMode>
);
