import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Dashboard from "./screens/admin/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Analytics from "./screens/admin/Analytics";
import Reports from "./screens/admin/Reports";
import Settings from "./screens/admin/Settings";

import useAuthCheck from "./hooks/useAuthCheck";

const App = ({ data }) => {
  const authCheck = useAuthCheck(data);
  return !authCheck ? (
    ""
  ) : (
    <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: "30px",
            zIndex: "9999",
          },
        }}
      />
      <HashRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout data={data} />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
