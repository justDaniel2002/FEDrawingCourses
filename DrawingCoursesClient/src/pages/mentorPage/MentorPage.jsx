import { Link } from "react-router-dom";
import { coursesData } from "../../data/data";

export const MentorPage = () => {
  return (
    <>
      <div className="bg-buttonBlue text-white pt-10 px-20">
        <div className="flex justify-between mb-5">
          <div className="text-xl font-light">Instructor Dashboard</div>
          <div className="flex">
            <button className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue mr-10">
              Order history
            </button>
            <button className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue">
              Create a new course
            </button>
          </div>
        </div>
        <div className="flex">
          <Link className="pb-3 mr-20" to={"/"}>
            Courses
          </Link>
          <Link className="pb-3" to={"/"}>
            Review
          </Link>
        </div>
      </div>
      <div className=" py-10 px-20 flex">
        <div className="w-1/4">
          Total Revenue
          <div>$0</div>
        </div>
        <div className="w-1/4">
          Total Students
          <div>0</div>
        </div>
      </div>

      <div className="my-10 px-60">
        <input className="p-2 border border-grey500" placeholder="Search course" />
        <button className="p-2 bg-grey500">Search</button>
      </div>

      <div className="px-40">
        {coursesData.map((course) => (
          <>
            <div className="flex mb-10 p-5 border border-grey500 justify-between">
              <img className="w-1/4 mr-10" src={course.imageSrc} />
              <div className="mr-10 flex flex-col justify-between">
                <div className="text-2xl font-semibold">{course.course}</div>
                <div className="text-sm">
                  {course.profession} - {course.price}$
                </div>
                <div className="font-thin mb-5">{course.category}</div>
                <div className="text-right">{course.createdDate}</div>
              </div>
              <div className="self-center">
                <button className="block mb-3 p-2 bg-buttonBlue text-white rounded-xl">
                  Edit
                </button>
                <button className="block mb-3 p-2 bg-red text-white rounded-xl">
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
