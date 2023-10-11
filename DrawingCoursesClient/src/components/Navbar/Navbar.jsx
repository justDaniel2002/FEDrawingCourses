import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import React from "react";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactus from "./Contactus";
import { Link, redirect, useNavigate } from "react-router-dom";

// interface NavigationItem {
//   name: string;
//   href: string;
//   current: boolean;
// }

const navigation = [
  { name: "Home", href: "", current: true },
  { name: "Courses", href: "/Course", current: false },
  { name: "Tools", href: "/Tool", current: false },
  { name: "Mentors", href: "/Mentor", current: false },
  { name: "Review", href: "", current: false },
  { name: "Join", href: "#join-section", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {

  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-lightpink navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex  items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-30px w-30px lg:hidden"
                  src={"/assets/logo/borcell.png"}
                  alt="Courses-Logo"
                  style={{ width: '9rem', height: '7rem' }}
                />
                <img
                  className="hidden h-48px w-48px lg:block"
                  src={"/assets/logo/borcell.png"}
                  alt="Courses-Logo"
                  style={{ width: '9rem', height: '7rem' }}
                />
              </div>
            </div>
            {/* LINKS */}
            <div>
              <div className="hidden sm:ml-14 md:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current ? " text-purple" : "hover:text-purple",
                        "px-3 py-4 text-15px font-medium space-links"
                      )}
                      aria-current={item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Contactus />
                  <div style={{ paddingLeft: '10rem' }}>
                    {/* SIGNIN DIALOG */}
                    <div className="hidden md:block">
                      {/* {session?.user ? (
                        <>
                          <p className="text-sky-600"> {session.user.name}</p>
                          <button className="text-red-500" onClick={() => {}}>
                            Sign Out
                          </button>
                        </>
                      ) : ( */}
                        <button className="bg-purple hover:bg-purple hover:text-white text-white text-15px font-medium ml-8 py-4 px-5 rounded" onClick={() => {navigate("/auth/login")}}>
                          Sign In
                        </button>
                      {/* )} */}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* REGISTER DIALOG */}

            {/* <Registerdialog /> */}

            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}

            <div className="block md:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
