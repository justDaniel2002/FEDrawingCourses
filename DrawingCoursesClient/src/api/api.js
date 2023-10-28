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

export const getCourses = async () => {{
  const res = await axios.get(`http://localhost:8080/courses`)
  console.log(res);
  return res.data
}}

export const getMyCourses = async (username) => {{
  const res = await axios.get(`http://localhost:8080/courses/customer/${username}`)
  console.log(res);
  return res.data
}}

export const getCourseDetails = async (course_id) => {
  const res = await axios.get(`http://localhost:8080/coursedetail/${course_id}`)
  console.log(res);
  return res.data
}

export const getCourseById = async (id) => {{
  const res = await axios.get(`http://localhost:8080/courses/${id}`)
  console.log(res);
  return res.data
}}

export const getTools = async () => {{
  const res = await axios.get(`http://localhost:8080/items`)
  console.log(res);
  return res.data
}}

export const getToolById = async (id) => {{
  const res = await axios.get(`http://localhost:8080/items/${id}`)
  console.log(res);
  return res.data
}}

export const postPayment = async (ammount, token) => {

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const res = await axios.post(`http://localhost:8080/payment/pay?price=${ammount}`)
  console.log(res);
  return res.data
}

export const postComment = async (data) => {
  console.log(data)
  const res = await axios.post(`http://localhost:8080/comments`, data)
  console.log(res);
  return res.data
}

export const orderCourse = async (data) => {
  const res = await axios.post(`http://localhost:8080/ordercourses`, data)
  console.log(res);
  return res.data
}

export const orderTool = async (data) => {
  const res = await axios.post(`http://localhost:8080/orderitems`, data)
  console.log(res);
  return res.data
}

export const getCourseByCategory = async (id) => {{
  const res = await axios.get(`http://localhost:8080/courses/category/${id}`)
  console.log(res);
  return res.data
}}

export const api = {getCourses,getMyCourses, getCourseById, getTools, getToolById, postPayment, postComment, 
  getCourseDetails, orderCourse, orderTool, getCourseByCategory}


