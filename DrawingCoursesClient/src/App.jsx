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
import Admin from "./admin/page";
import Customers from "./pages/customers/customers";
import Orders from "./pages/orders/orders";
import { LoginAction } from "./pages/auth/LoginAction";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registerdialog from "./pages/registration/Registerdialog";
import { RegisterAction } from "./pages/registration/RegisterAction";
import Cart from "./pages/cart/cart";
import MyCourses from "./pages/MyCourses/myCourses";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<h1>Error</h1>}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<LoginPage />} action={LoginAction}/>

          <Route path="Course/:id" element={<CoursesDetail />} />
          <Route path="Course" element={<Courses />} />
          
          {/* <Route path="CourseDetail" element={<CoursesDetail />} /> */}
          <Route path="Mentor" element={<Mentor />} />
          <Route path="Registration" element={<Registerdialog />} action={RegisterAction}/>
          <Route path="Tool/:id" element={<ToolDetail />} />
          <Route path="Tool" element={<Tool />} />
          <Route path="cart" element={<Cart />}/>
          {/* <Route path="ToolDetail" element={<ToolDetail />} /> */}
          <Route path="MyCourses" element={<MyCourses />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />}/>
          <Route path="customers" element={<Customers />}/>
          <Route path="orders" element={<Orders />}/>
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
