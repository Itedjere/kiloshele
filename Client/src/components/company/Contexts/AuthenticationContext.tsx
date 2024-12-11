import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApolloClient } from "@apollo/client";
import { CompanyType } from "../../../utitlities/typesUtils";

type AuthenticatedCompany = {
  company: CompanyType;
  token: string;
};

interface AuthenticationContextDefaultValues {
  auth: AuthenticatedCompany | null;
  handleAuthentication: (authDetails: AuthenticatedCompany) => void;
  authLoading: boolean;
  logoutUser: () => void;
}

const AuthenticationContext =
  createContext<AuthenticationContextDefaultValues | null>(null);

export const useAuthenticatedContext =
  (): AuthenticationContextDefaultValues => {
    const context = useContext(AuthenticationContext);
    if (!context) {
      throw new Error(
        "useAuthenticatedContext must be within AuthenticatedContextProvider"
      );
    }

    return context;
  };

interface AuthenticatedContextProviderProps {
  children: ReactNode;
}

export default function AuthenticationContextProvider({
  children,
}: AuthenticatedContextProviderProps) {
  const [auth, setAuth] = useState<AuthenticatedCompany | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    const localStorageInfo = localStorage.getItem("AuthUser");
    if (!localStorageInfo) {
      setAuthLoading(false);
      return;
    }

    const authDetails = JSON.parse(localStorageInfo);
    setAuth(authDetails);
    setAuthLoading(false);
  }, []);

  const handleAuthentication = (authDetails: AuthenticatedCompany) => {
    setAuth(authDetails);
    localStorage.setItem("AuthUser", JSON.stringify(authDetails));
    // Clear Apollo Client cache and refetch active queries
    client.resetStore();
  };

  const logoutUser = () => {
    localStorage.removeItem("AuthUser");
    setAuth(null);
    // Clear Apollo Client cache
    client.clearStore();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        auth,
        handleAuthentication,
        authLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
