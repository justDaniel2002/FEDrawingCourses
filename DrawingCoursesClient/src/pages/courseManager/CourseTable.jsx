import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../../data/data";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { api } from "../../api/api";
import { HiTemplate } from "react-icons/hi";
import { SiCoursera } from "react-icons/si";

const CourseTable = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [courses, setCourses] = useState([]);

  const callback = async () => {
    const getItems = await api.getCourses();

    setCourses(getItems);
  };
  useEffect(() => {
    callback();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-6 grid-cols-6 items-center justify-between cursor-pointer gap-3">
            <span># Course</span>
            <span className="hidden md:grid">Title</span>
            <span className="hidden sm:grid">Price</span>
            <span className="hidden sm:grid">Category</span>
            <span className="hidden sm:grid">Level</span>
            <span className="hidden sm:grid">Creator</span>
          </div>
          <ul>
            {courses.map((item, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-6 grid-cols-6 items-center justify-between cursor-pointer gap-3"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <SiCoursera className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 text-sm">{item.id}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{item.title}</span>
                </p>
                
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${item.price.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{item.price}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{item.category.name}</span>
                </p>
                <div className="text-gray-600 sm:text-left text-right">
                  <span>{item.level}</span>
                </div>
                <div className="sm:flex hidden justify-between items-center">
                  <span>{item.user.name}</span>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
