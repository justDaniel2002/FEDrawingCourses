import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const signIn = async (model) => {
  const res = await axios
    .post(`http://localhost:8080/login`, model)
    .catch((err) => {
      console.log(err);
      toast("Unauthetiaction", { type: toast.TYPE.ERROR });
      setTimeout(() => {
        // Place your code here
        window.location.href = "http://localhost:5173/auth/login";
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
      toast("Unauthentiaction", { type: toast.TYPE.ERROR });
      setTimeout(() => {
        // Place your code here
        window.location.href = "http://localhost:5173/Registration";
      }, 2000);
    });
  console.log(res);
  return res;
};

export const getCourses = async () => {
  {
    const res = await axios.get(`http://localhost:8080/courses`);
    console.log(res);
    return res.data;
  }
};

export const getMyCourses = async (username) => {
  {
    const res = await axios.get(
      `http://localhost:8080/courses/customer/${username}`
    );
    console.log(res);
    return res.data;
  }
};

export const getCourseDetails = async (course_id) => {
  const res = await axios.get(
    `http://localhost:8080/coursedetail/${course_id}`
  );
  console.log(res);
  return res.data;
};

export const postCourseDetails = async (data, token) => {
  const res = await axios.post(
    `http://localhost:8080/coursedetail/${course_id}`
  );
  console.log(res);
  return res.data;
};

export const getCourseById = async (id) => {
  {
    const res = await axios.get(`http://localhost:8080/courses/${id}`);
    console.log(res);
    return res.data;
  }
};

export const getTools = async () => {
  {
    const res = await axios.get(`http://localhost:8080/items`);
    console.log(res);
    return res.data;
  }
};

export const getToolById = async (id) => {
  {
    const res = await axios.get(`http://localhost:8080/items/${id}`);
    console.log(res);
    return res.data;
  }
};

export const postPayment = async (ammount, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios.post(
    `http://localhost:8080/payment/pay?price=${ammount}`
  );
  console.log(res);
  return res.data;
};

export const postComment = async (data) => {
  console.log(data);
  const res = await axios.post(`http://localhost:8080/comments`, data);
  console.log(res);
  return res.data;
};

export const orderCourse = async (data) => {
  const res = await axios.post(`http://localhost:8080/ordercourses`, data);
  console.log(res);
  return res.data;
};

export const orderTool = async (data) => {
  const res = await axios.post(`http://localhost:8080/orderitems`, data);
  console.log(res);
  return res.data;
};

export const getCourseByCategory = async (id) => {
  {
    const res = await axios.get(`http://localhost:8080/courses/category/${id}`);
    console.log(res);
    return res.data;
  }
};

export const getCourseByInstructor = async (username) => {
  {
    const res = await axios.get(
      `http://localhost:8080/courses/instructor/${username}`
    );
    console.log(res);
    return res.data;
  }
};

export const postProfileImage = async (formData, username) => {
  const res = await axios.post(
    `http://localhost:8080/users/upload/image/${username}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for a file upload
      },
    }
  );
  console.log(res);
  return res.data;
};

export const postCourseImage = async (formData, course_id) => {
  const res = await axios.post(
    `http://localhost:8080/courses/upload/image/${course_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for a file upload
      },
    }
  );
  console.log(res);
  return res.data;
};

export const changePassword = async (data, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios.post(
    `http://localhost:8080/users/change-password`,
    data
  );
  console.log(res);
  return res.data;
};

export const changeAccountInfo = async (data) => {
  const res = await axios.put(`http://localhost:8080/users`, data);
  console.log(res);
  return res.data;
};

export const getUser = async (username) => {
  const res = await axios.get(`http://localhost:8080/users/${username}`);
  console.log(res);
  return res.data;
};

export const getAllInstructor = async () => {
  const res = await axios.get(`http://localhost:8080/users/instructor`);
  console.log(res);
  return res.data;
};


export const getCourseCategory = async () => {
  const res = await axios.get(`http://localhost:8080/coursecategory`);
  console.log(res);
  return res.data;
};

export const getTooleCategory = async () => {
  const res = await axios.get(`http://localhost:8080/itemcategory`);
  console.log(res);
  return res.data;
};

export const searchCourse = async (title) => {
  const res = await axios.get(
    `http://localhost:8080/courses/search?title=${title}`
  );
  console.log(res);
  return res.data;
};

export const searchTool = async (name) => {
  const res = await axios.get(
    `http://localhost:8080/items/search?name=${name}`
  );
  console.log(res);
  return res.data;
};

export const delCourse = async (id, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios
    .delete(`http://localhost:8080/courses/${id}`)
    .catch((err) => toast(err.message, { type: toast.TYPE.ERROR }));
  console.log(res);
  return res.data;
};

export const postCourse = async (data, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios
    .post(`http://localhost:8080/courses`, data)
    .catch((err) => toast(err.message, { type: toast.TYPE.ERROR }));
  console.log(res);
  return res.data;
};

export const editCourse = async (data, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await axios
    .put(`http://localhost:8080/courses`, data)
    .catch((err) => toast(err.message, { type: toast.TYPE.ERROR }));
  console.log(res);
  return res.data;
};

export const getOrderHistory = async(username) => {
  const res = await axios.get(`http://localhost:8080/ordercourses/history/${username}`)
  console.log(res);
  return res.data;
}

export const getOrderToolHistory = async(username) => {
  const res = await axios.get(`http://localhost:8080/orderitems/history/${username}`)
  console.log(res);
  return res.data;
}

export const api = {
  getCourses,
  getMyCourses,
  getCourseById,
  getTools,
  getCourseDetails,
  getCourseByCategory,
  getCourseByInstructor,
  getToolById,
  getUser,
  getAllInstructor,
  getCourseCategory,
  getTooleCategory,
  getOrderHistory,
  getOrderToolHistory,
  
  postPayment,
  postComment,
  postProfileImage,
  postCourse,
  postCourseImage,

  orderCourse,
  orderTool,

  changePassword,
  changeAccountInfo,

  searchCourse,
  searchTool,

  editCourse,

  delCourse,
};
