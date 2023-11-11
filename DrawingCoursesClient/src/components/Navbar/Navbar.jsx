import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import React from "react";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactus from "./Contactus";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";

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
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [account, setAccount] = useRecoilState(accountState);

  const navigate = useNavigate();

  const unhidden = () => {
    const menu = document.getElementById("accountMenu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    }
  };

  const hidden = () => {
    const menu = document.getElementById("accountMenu");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  };

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
                  style={{ width: "9rem", height: "7rem" }}
                />
                <img
                  className="hidden h-48px w-48px lg:block"
                  src={"/assets/logo/borcell.png"}
                  alt="Courses-Logo"
                  style={{ width: "9rem", height: "7rem" }}
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
                      className="hover:text-purple px-3 py-4 text-15px font-medium space-links whitespace-nowrap"
                      aria-current={item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Contactus />
                  {account?.sub ? (
                    <>
                    <Link
                      to={"/MyCourses"}
                      className="hover:text-purple px-3 py-4 text-15px font-medium space-links whitespace-nowrap"
                      aria-current="page"
                    >
                      MyCourses
                    </Link>
                    <Link
                    to={`/OrderHistory/${account.sub}`}
                    className="hover:text-purple px-3 py-4 text-15px font-medium space-links whitespace-nowrap"
                    aria-current="page"
                  >
                    OrderHistory
                  </Link>
                  </>
                  ) : (
                    ""
                  )}

                  <div
                    style={{ paddingLeft: "10rem" }}
                    className="flex items-center"
                  >
                    {/* SIGNIN DIALOG */}
                    {account?.sub ? (
                      <Link to={"cart"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </Link>
                    ) : (
                      ""
                    )}

                    <div className="hidden md:block">
                      {account?.sub ? (
                        <>
                          <div onMouseEnter={unhidden} className="text-sky-600">
                            {" "}
                            <div className="flex items-center">
                              {account?.img ? (
                                <img className="w-10 mr-3 rounded-full" src={account?.img} />
                              ) : (
                                <img
                                  className="w-10 mr-3"
                                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                                />
                              )}

                              {account?.sub}
                              <div
                                className="text-red-500 w-28 ml-3"
                                onClick={() => {
                                  localStorage.clear();
                                  setAccount(undefined);
                                  navigate("/auth/login");
                                }}
                              >
                                Sign Out
                              </div>
                            </div>
                            <div
                              id="accountMenu"
                              onMouseLeave={(event) => hidden(event)}
                              className="hidden absolute border border-grey500 bg-white rounded-xl w-56 -right-14"
                            >
                              <div className="px-5 py-3 flex items-center">
                                {account?.img ? (
                                <img className="w-1/3 mr-1 rounded-full" src={account?.img} />
                              ) : (
                                <img
                                  className="w-1/3 mr-1"
                                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                                />
                              )}
                                <div className="2/3 overflow-hidden">
                                  <div className="font-semibold">
                                    {account?.sub}
                                  </div>
                                  <div>{account?.iss}</div>
                                </div>
                              </div>
                              <Link
                                to={"/MyCourses"}
                                className="block hover:bg-grey500 px-5 py-3"
                              >
                                My Course
                              </Link>
                              <Link
                                to={"/Profile"}
                                className="block hover:bg-grey500 px-5 py-3"
                              >
                                Profile
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <button
                          className="bg-purple hover:bg-purple hover:text-white text-white text-15px font-medium ml-8 py-4 px-5 rounded"
                          onClick={() => {
                            navigate("/auth/login");
                          }}
                        >
                          Sign In
                        </button>
                      )}
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
