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
import Registration from "./pages/registration/page";
import Tool from "./components/Tools/Tool";
import ToolDetail from "./pages/toolDetail/page";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<h1>Error</h1>}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="Course" element={<Courses />} />
          <Route path="CourseDetail" element={<CoursesDetail />} />
          <Route path="Mentor" element={<Mentor />} />
          <Route path="Registration" element={<Registration />} />
          <Route path="Tool" element={<Tool />} />
          <Route path="ToolDetail" element={<ToolDetail />} />
        </Route>
      </Route>
    ),
    { basename: "" }
  );

  return (
    <>
      <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
    </>
  );
}

export default App;
