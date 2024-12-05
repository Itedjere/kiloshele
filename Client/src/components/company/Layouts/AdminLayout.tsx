import { Outlet } from "react-router";
import BackToTop from "../BackToTop";
import { useAdminLayoutContext } from "../Contexts/AdminLayoutContext";
import Footer from "../Footer/Footer";
import BottomNavigation from "../Navigation/BottomNavigation";
import TopNavigation from "../Navigation/TopNavigation";
import Sidebar from "../Sidebar/Sidebar";

export default function AdminLayout() {
  const { sidebarVisible } = useAdminLayoutContext();
  return (
    <div className="container-fluid position-relative bg-light d-flex p-0">
      <Sidebar />
      <div className={`content ${sidebarVisible ? "open" : ""}`}>
        <TopNavigation />

        <Outlet />

        <Footer />

        <BottomNavigation />
      </div>
      <BackToTop />
    </div>
  );
}
