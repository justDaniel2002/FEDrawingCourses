import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRecoilValue } from "recoil";
import { accountState } from "../atom/accountState";

export default function AdminLayout() {
  const account = useRecoilValue(accountState);
  window.scrollTo(0, 0);
  return (
    <Sidebar>
      <div className="flex justify-between px-4 pt-4">
        <h2>Dashboard</h2>
        <div>
          <h2>Welcome Back, {account.sub}</h2>
          <Link to={"/auth/login"}>Logout</Link>
        </div>
      </div>
      <Outlet />
    </Sidebar>
  );
}
