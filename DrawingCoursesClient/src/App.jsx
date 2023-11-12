import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/layout";
import Home from "./home/page";
import Courses from "./pages/courses/Courses";
import CoursesDetail from "./pages/courseDetail/page";
import LoginPage from "./pages/auth/Login";
import Mentor from "./pages/mentor/page";
import ToolDetail from "./pages/toolDetail/page";
import Tool from "./pages/tools/page";
import AdminLayout from "./layouts/adminLayout";
import Customers from "./pages/customers/customers";
import Orders, { OrderTool } from "./pages/orders/orders";
import { LoginAction } from "./pages/auth/LoginAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registerdialog from "./pages/registration/Registerdialog";
import { RegisterAction } from "./pages/registration/RegisterAction";
import Cart from "./pages/cart/cart";
import MyCourses from "./pages/MyCourses/myCourses";
import { Profile } from "./pages/Profile/Profile";
import Admin from "./pages/admin/page";
import { MentorPage } from "./pages/mentorPage/MentorPage";
import { PaymentSucess } from "./pages/paymentSucess/PaymentSucess";
import { useRecoilState } from "recoil";
import { accountState } from "./atom/accountState";
import { getTitem } from "./utils/localStorageExtension";
import { useEffect } from "react";
import StudyingCoursesPage from "./pages/StudyingCourse/page";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { mentorPageLoader } from "./pages/mentorPage/mentorPageLoader";
import { MentorDetail } from "./pages/MentorDetail/MentorDetail,";
import { mentorDetailLoader } from "./pages/MentorDetail/MentorDetailLoader";
import { orderHistoryLoader } from "./pages/OrderHistory/orderHistoryLoader";
import OrderHistoryPage from "./pages/OrderHistory/page";
import ItemsManager from "./pages/itemsManager/ItemsManager";
import CourseTable from "./pages/courseManager/CourseTable";

function App() {
  const [account, setAccount] = useRecoilState(accountState);
  useEffect(() => {
    const localAccount = getTitem("account");
    console.log(localAccount);
    if (localAccount?.sub !== undefined) {
      setAccount(localAccount);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<h1>Error</h1>}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route
            path="auth/login"
            element={<LoginPage />}
            action={LoginAction}
          />

          <Route path="Course/:id" element={<CoursesDetail />} />
          <Route path="Course" element={<Courses />} />

          {/* <Route path="CourseDetail" element={<CoursesDetail />} /> */}
          <Route path="Mentor" element={<Mentor />} />
          <Route
            path="Mentor/:username"
            element={<MentorDetail />}
            loader={mentorDetailLoader}
          />
          <Route
            path="Registration"
            element={<Registerdialog />}
            action={RegisterAction}
          />
          <Route path="Tool/:id" element={<ToolDetail />} />
          <Route path="Tool" element={<Tool />} />
          <Route path="cart" element={<Cart />} />
          {/* <Route path="ToolDetail" element={<ToolDetail />} /> */}
          <Route path="MyCourses" element={<MyCourses />} />
          <Route
            path="OrderHistory/:username"
            element={<OrderHistoryPage />}
            loader={orderHistoryLoader}
          />
          <Route path="Mentor" element={<Mentor />} />
          <Route
            path="StudyingCourse/:courseId"
            element={
              <>
                <StudyingCoursesPage />
              </>
            }
          />
        </Route>

        <Route path="/Profile" element={<Profile />} />
        <Route path="/MentorPage" element={<MentorPage />} />
        <Route path="/pay/success" element={<PaymentSucess />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orderTool" element={<OrderTool />} />
          <Route path="items" element={<ItemsManager />} />
          <Route path="courses" element={<CourseTable />} />
        </Route>
      </Route>
    ),
    { basename: "" }
  );

  return (
    <>
      <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
      <ToastContainer />
    </>
  );
}

export default App;
