import * as React from "react";
import { useState, useEffect } from "react";
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import SearchCourses from "../courses/SearchCourse";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";

const MyCoursesDialog = () => {
  const account = useRecoilValue(accountState);
  const [courses, setCourses] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Beginner Courses");
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const callBack = async () => {
      const getCourses = await api.getMyCourses(account.sub);
      setCourses(getCourses);
      const categories = await api.getCourseCategory();
      setCourseCategories(categories);
      setSelectedButton(categories[0].name);
    };

    callBack();
  }, []);

  let selectedNames = courses.filter((c) => c.category.name === selectedButton);

  if (selectedButton == "All Courses") {
    selectedNames = courses;
  }

  const nameElements = selectedNames.map((name, index) => (
    <Link to={`/StudyingCourse/${name.id}`} className="block" key={index}>
      <div className=" text-lg sm:text-sm py-5 lg:py-0">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <img
            src={`${name.img}`}
            alt={name.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-6 block font-normal text-gray-900 truncate">
            {name.title}
          </div>
          <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1 truncate">
            Study...
          </div>
        </div>
        <p
          aria-hidden="true"
          className="mt-2 mb-5 text-2xl font-semibold truncate"
        >
          {name.description}
        </p>

        <div className="flex justify-between border-solid border-2 border-grey500 rounded-md p-2">
          <p>12 Classes</p>
          <div className="flex flex-row space-x-4">
            <div className="flex">
              <img src={"/assets/courses/account.svg"} alt="circle" />
              <p className="text-lightgrey ml-1">120</p>
            </div>
            <div className="flex">
              <img src={"/assets/courses/Star.svg"} alt="star" />
              <p className="ml-1">{name.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div>
      {/*mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8*/}
      <div
        id="courses-section"
        className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8"
        style={{ marginBottom: "15rem" }}
      >
        <div className="text-center">
          <h2 className="font-bold text-6xl mt-14">My Courses</h2>
        </div>

        {/* <div className='sm:flex justify-between items-center pb-12' style={{paddingBottom: '1rem'}}>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Fulltime Courses</h2>
                </div> */}

        <div
          className="flex items-center justify-between nowhitespace rounded-xl bg-white p-1 overflow-x-auto"
          style={{ float: "left", width: "100%", marginRight: "2%" }}
        >
          {" "}
          {/* space-x-5 */}
          <div className="flex h-16">
            {/* FOR DESKTOP VIEW */}
            {courseCategories?.map((category) => (
              <button
                onClick={() => setSelectedButton(category.name)}
                className={
                  "bg-white mr-3 " +
                  (selectedButton === category.name
                    ? "text-black border-b-2 border-orange"
                    : "text-lightgrey") +
                  " pb-2 text-lg hidden sm:block"
                }
              >
                {category.name}
              </button>
            ))}
            {/* <button onClick={() => setSelectedButton('All Courses')} className={"bg-white " + (selectedButton === 'All Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block mr-5"} style={{textAlign: 'left'}}>All Courses</button>
                    <button onClick={() => setSelectedButton('Beginner Courses')} className={"bg-white " + (selectedButton === 'Beginner Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block mr-5"} style={{textAlign: 'left'}}>Beginner Courses</button>
                   <button onClick={() => setSelectedButton('Intermediate Courses')} className={"bg-white " + (selectedButton === 'Intermediate Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block mr-5"} style={{textAlign: 'left'}}>Intermediate Courses</button>
                    <button onClick={() => setSelectedButton('Upper-intermediate Courses')} className={"bg-white " + (selectedButton === 'Upper-intermediate Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block mr-5"} style={{textAlign: 'left'}}>Advanced Courses</button> */}

            {/* FOR MOBILE VIEW */}
            <GlobeAltIcon
              onClick={() => setSelectedButton("Beginner Courses")}
              width={70}
              height={70}
              className={
                "bg-white " +
                (selectedButton === "Beginner Courses"
                  ? "border-b-2 border-orange fill-orange"
                  : "") +
                " pb-2 block sm:hidden"
              }
            />
            <DevicePhoneMobileIcon
              onClick={() => setSelectedButton("Elementary Courses")}
              width={70}
              height={70}
              className={
                "bg-white " +
                (selectedButton === "Elementary Courses"
                  ? "border-b-2 border-orange fill-orange"
                  : "") +
                " pb-2 block sm:hidden"
              }
            />
            <CircleStackIcon
              onClick={() => setSelectedButton("Intermediate Courses")}
              width={70}
              height={70}
              className={
                "bg-white " +
                (selectedButton === "Intermediate Courses"
                  ? "border-b-2 border-orange fill-orange"
                  : "") +
                " pb-2 block sm:hidden"
              }
            />
            <CloudIcon
              onClick={() => setSelectedButton("Upper-intermediate Courses")}
              width={70}
              height={70}
              className={
                "bg-white " +
                (selectedButton === "Upper-intermediate Courses"
                  ? "border-b-2 border-orange fill-orange"
                  : "") +
                " pb-2 block sm:hidden"
              }
            />
          </div>
        </div>

        <div>
          <div className="mx-auto max-w-7xl">
            <div
              className="grid grid-cols-1 gap-y-10 gap-x-8 py-12"
              style={{ paddingTop: "0rem", width: "100%" }}
            >
              <div
                className="col-start-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8"
                style={{ float: "right" }}
              >
                {nameElements.length > 0 ? (
                  nameElements
                ) : (
                  <p>No data to show</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesDialog;
