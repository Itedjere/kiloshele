import { BrowserRouter, Navigate, Route, Routes } from "react-router";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import AddStaffs from "./pages/AddStaffs";
import Staffs from "./pages/Staffs";
import CompanyDetails from "./pages/CompanyDetails";
import ChangePassword from "./pages/ChangePassword";
import PageLoading from "./components/company/LoadingSkeletons/PageLoading";
import { useAuthenticatedContext } from "./components/company/Contexts/AuthenticationContext";
import UpdateExpenses from "./pages/UpdateExpenses";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  const { auth, authLoading } = useAuthenticatedContext();

  if (authLoading) return <PageLoading />;
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ className: "react-icons" }}>
        <AdminLayoutContextProvider>
          <Routes>
            <Route
              path="/login"
              element={auth ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={auth ? <Navigate to="/" /> : <Signup />}
            />
            <Route element={<AdminLayout />}>
              <Route
                path="/"
                element={auth ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/add-products"
                element={auth ? <AddProduct /> : <Navigate to="/login" />}
              />
              <Route
                path="/products/:productId/edit"
                element={auth ? <UpdateProduct /> : <Navigate to="/login" />}
              />
              <Route
                path="/add-sales"
                element={auth ? <AddSales /> : <Navigate to="/login" />}
              />
              <Route
                path="/add-expenses"
                element={auth ? <AddExpenses /> : <Navigate to="/login" />}
              />
              <Route
                path="/expenses/:expenseId/edit"
                element={auth ? <UpdateExpenses /> : <Navigate to="/login" />}
              />
              <Route
                path="/all-products"
                element={auth ? <Products /> : <Navigate to="/login" />}
              />
              <Route
                path="/all-sales"
                element={auth ? <Sales /> : <Navigate to="/login" />}
              />
              <Route
                path="/all-expenses"
                element={auth ? <Expenses /> : <Navigate to="/login" />}
              />
              <Route
                path="/charts"
                element={auth ? <Chart /> : <Navigate to="/login" />}
              />
              <Route
                path="/coming-soon"
                element={auth ? <ComingSoon /> : <Navigate to="/login" />}
              />
              <Route
                path="/add-staffs"
                element={auth ? <AddStaffs /> : <Navigate to="/login" />}
              />
              <Route
                path="/all-staffs"
                element={auth ? <Staffs /> : <Navigate to="/login" />}
              />
              <Route
                path="/change-password"
                element={auth ? <ChangePassword /> : <Navigate to="/login" />}
              />
              <Route
                path="/company-details"
                element={auth ? <CompanyDetails /> : <Navigate to="/login" />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayoutContextProvider>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
