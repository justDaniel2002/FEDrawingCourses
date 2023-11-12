
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbarin from "../components/Navbar";
import "../globals.css";
// import Navbar from "./components/Navbar/index";
// import Footer from "./components/Footer/Footer";

// interface IProps {
//   children: React.ReactNode; 
// }

export default function RootLayout() 
{ 
  return (
    <html lang="en">
      <body>
      <Navbarin />
      <Outlet />
      <Footer />
      </body>
    </html>
  );
}
