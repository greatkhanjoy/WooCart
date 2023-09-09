import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import PopupCartText from "../screens/admin/PopupCartText";

const DashboardLayout = ({ data }) => {
  return (
    <>
      <div className="bg-[#fcf9f7] w-full p-6 mt-8 relative">
        <PopupCartText data={data} />
      </div>
    </>
  );
};

export default DashboardLayout;
