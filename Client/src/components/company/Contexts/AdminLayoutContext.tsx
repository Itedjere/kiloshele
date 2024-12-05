import { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context value
interface AdminLayoutContextType {
  sidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLayoutContext = createContext<AdminLayoutContextType | undefined>(
  undefined
);

export const useAdminLayoutContext = (): AdminLayoutContextType => {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error(
      "useAdminLayoutContext must be used within an AdminLayoutContextProvider"
    );
  }

  return context;
};

// Provider component
interface AdminLayoutContextProviderProps {
  children: ReactNode;
}

export default function AdminLayoutContextProvider({
  children,
}: AdminLayoutContextProviderProps) {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  return (
    <AdminLayoutContext.Provider
      value={{
        sidebarVisible,
        setSidebarVisible,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
}
