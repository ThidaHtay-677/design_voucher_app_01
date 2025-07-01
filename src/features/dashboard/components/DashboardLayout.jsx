import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import useUserStore from "../../../stores/useUserStore";
import Header from "./Header";
import PageLoading from "../../../components/PageLoading";

const DashboardLayout = () => {
  const [token] = useCookie("my_token");//To check if the user is logged in
  const [userCookie] = useCookie("user");
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, []);//to show the user profile

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <main className=" flex flex-col min-h-screen p-5">
      <Header />
      <Suspense fallback={<PageLoading />}>
        <Outlet />
        {/* dashboard/products */}
      </Suspense>
      <Toaster position="top-right" />
    </main>
  );
};

export default DashboardLayout;
