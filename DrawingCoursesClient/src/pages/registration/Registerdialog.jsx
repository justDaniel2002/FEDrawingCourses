import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Form, useActionData, useSubmit, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registerdialog = () => {
  window.scrollTo(0, 0);
  const submit = useSubmit();

  const navigate = useNavigate();

  const data = useActionData();

  useEffect(() => {
    console.log(data)
    if(data?.message){
      toast(data.message, { type: toast.TYPE.SUCCESS });
      navigate("/auth/login")
    }
  }, [data])

  const submitFrm = (event) => {
    event.preventDefault()
    const frm = document.querySelector("Form");
    const formData = new FormData(frm);
    let isEmpty = false;
    let isRePasswords = true;

    // Check each field for null or empty values
    formData.forEach((value, key) => {
      if (!value || value === "") {
        isEmpty = true;
        toast("Value cant be empty", { type: toast.TYPE.ERROR });
      }
    });

    const password = formData.get("password");
    const repassword = formData.get("repassword");

    if(password!=repassword){
      isRePasswords = false
      toast("repassword and password are not alike", { type: toast.TYPE.ERROR });
    }

    if (!isEmpty&&isRePasswords) {
      submit(formData, { method: "post", action: "/Registration" });
    }
  };

  return (
    <main>
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
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="/assets/logo/Logo.svg"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up
              </h2>
            </div>
            <Form className="mt-8 space-y-6" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div style={{ padding: "5px" }}>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="address"
                    autoComplete="address"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Address"
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div style={{ padding: "5px" }}>
                  <label htmlFor="password" className="sr-only">
                    Re-Password
                  </label>
                  <input
                    id="password"
                    name="repassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Re-Enter Password"
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
                    By register you agree with our
                    <span className="p-color me-1">terms and conditions</span>
                    and
                    <span className="p-color ms-1">privacy policy</span>
                  </label>
                </div>
              </div>

              <div className="mx-auto">
                <label style={{ fontSize: "1.5rem" }}>Role:</label>
                <input
                  type="radio"
                  name="role"
                  value="ROLE_INSTRUCTOR"
                  style={{ marginLeft: "100px", height: "15px", width: "15px" }}
                  //onChange={(event) => setRole("instructor")}
                />
                <label style={{ paddingLeft: "5px" }}>Intructor</label>
                <input
                  type="radio"
                  name="role"
                  value="ROLE_CUSTOMER"
                  style={{ marginLeft: "100px", height: "15px", width: "15px" }}
                  // onChange={(event) => setRole("user")}
                />
                <label style={{ paddingLeft: "5px" }}>User</label>
              </div>

              <div>
                <button
                  onClick={(event)=>submitFrm(event)}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registerdialog;
