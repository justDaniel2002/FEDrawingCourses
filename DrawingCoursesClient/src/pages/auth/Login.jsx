import React, { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { accountState } from "../../atom/accountState";
import { useRecoilState } from "recoil";
import { setTitem } from "../../utils/localStorageExtension";
import { toast } from "react-toastify";

const LoginPage = () => {
  const username = useRef("");
  const password = useRef("");
  window.scrollTo(0, 0);

  const [account, setAccount] = useRecoilState(accountState);
  const data = useActionData();
  const navigae = useNavigate();

  useEffect(() => {
    console.log(data)
    if (data?.sub != undefined) {
      setTitem("account", data)
      setAccount(data);
      if (data.role === "ROLE_ADMIN") {
        navigae("/admin");
      } else if(data.role === "ROLE_INSTRUCTOR"){
        navigae(`/MentorPage`);
      } else{
        navigae("/");
      }
    } else {
      setAccount(undefined);
    }
  }, [data]);

  return (
    <div
      className="mx-auto max-w-2xl pt-0 pb-64 lg:max-w-7xl lg:px-8"
      style={{ marginBottom: "30px" }}
    >
      <div
        className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ width: "100%" }}
      >
        <img
          src="https://78.media.tumblr.com/50d43db43843a7dc2fbb93c660a1d0dc/tumblr_ozar2dfRQI1rh3rypo1_1280.gif"
          alt="My image"
          className="float-right"
          style={{
            width: "500px",
            height: "40rem",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        ></img>
        <div
          className="space-y-10"
          style={{
            backgroundColor: "#ffc1cc",
            padding: "40px",
            height: "40rem",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="/assets/logo/Logo.svg"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <Form className="mt-8 space-y-6" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div style={{ padding: "5px" }}>
                    <label htmlFor="user-name" className="sr-only">
                      Username
                    </label>
                    <input
                      onChange={(e) => (username.current = e.target.value)}
                      id="user-name"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Username"
                    />
                  </div>
                  <div style={{ padding: "5px" }}>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      onChange={(e) => (password.current = e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
                <hr /> {/* Divider */}
                <div>
                  <div className="flex space-x-4">
                    <Link
                      to="/Registration"
                      type="button"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
