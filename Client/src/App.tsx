import { BrowserRouter, Route, Routes } from "react-router";
import { IconContext } from "react-icons";

// CSS Files
import "./assets/company/css/bootstrap.min.css";
import "./assets/company/css/style.css";

// Import layout and files
import AdminLayout from "./components/company/Layouts/AdminLayout";
import AdminLayoutContextProvider from "./components/company/Contexts/AdminLayoutContext";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import AddSales from "./pages/AddSales";
import AddExpenses from "./pages/AddExpenses";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Expenses from "./pages/Expenses";
import Chart from "./pages/Chart";

function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <AdminLayoutContextProvider>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-products" element={<AddProduct />} />
              <Route path="/add-sales" element={<AddSales />} />
              <Route path="/add-expenses" element={<AddExpenses />} />
              <Route path="/all-products" element={<Products />} />
              <Route path="/all-sales" element={<Sales />} />
              <Route path="/all-expenses" element={<Expenses />} />
              <Route path="/charts" element={<Chart />} />
            </Route>
          </Routes>
        </AdminLayoutContextProvider>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
