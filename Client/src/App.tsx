import { BrowserRouter, Route, Routes } from "react-router";
import { IconContext } from "react-icons";

// CSS Files
import "./assets/company/css/bootstrap.min.css";
import "./assets/company/css/style.css";

// Import layout and files
import AdminLayout from "./components/company/Layouts/AdminLayout";
import AdminLayoutContextProvider from "./components/company/Contexts/AdminLayoutContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <AdminLayoutContextProvider>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AdminLayoutContextProvider>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
