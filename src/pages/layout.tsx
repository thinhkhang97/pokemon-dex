import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function MainLayout() {
  return (
    <div className="h-full">
      <Navbar />
      <Outlet />
    </div>
  );
}
