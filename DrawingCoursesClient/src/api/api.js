import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';

export const signIn = async (model) => {
  const res = await axios
    .post(`http://localhost:8080/login`, model)
    .catch((err) => {
      console.log(err);
      toast("Unauthetiaction", {type: toast.TYPE.ERROR})
      setTimeout(() => {
        // Place your code here
        window.location.href = "http://localhost:5173/auth/login"
      }, 2000);
    });
  console.log(res);
  return res.data;
};

export const signUp = async (model) => {
    const res = await axios
      .post(`http://localhost:8080/register`, model)
      .catch((err) => {
        console.log(err);
        toast("Unauthentiaction", {type: toast.TYPE.ERROR})
        setTimeout(() => {
          // Place your code here
          window.location.href = "http://localhost:5173/Registration"
        }, 2000);
      });
    console.log(res);
    return res;
  };
