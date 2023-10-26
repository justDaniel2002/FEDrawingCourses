import { useEffect, useState } from "react";
import { studyingCourses } from "../../data/StudyingCourse";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export const StudyingCourses = () => {
  const [Parts, setParts] = useState([]);
  const [Ipart, setPart] = useState();
  const [Course, setCourse] = useState()

  const { courseId } = useParams();

  useEffect(() => {
    const callback = async() => {
      const courseLessions = await api.getCourseDetails(courseId)
      console.log("courseLessions", courseLessions)
      await setParts(courseLessions)
      await setPart(Parts[0])
      const getCourse = await api.getCourseById(courseId)
      await setCourse(getCourse)
      console.log("getCourse", getCourse)
    }

    callback()
  }, []);

  return (
    <main className="my-80">
      <div className="flex mt-40 pb-40 h-screen">
        <div className="w-8/12">
          <iframe
            className="w-full h-5/6"
            src={`https://www.youtube.com/embed/${Ipart?.url}`}
          ></iframe>

          <div className="border-2 border-grey500 mt-10 p-5 shadow-lg">
            <div className="flex items-center text-lg font-semibold mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
              Tổng quan
            </div>
            <div className="px-5">
              <div className="font-medium">Khóa</div>
              <div>{Course?.title}</div>
              <div className="font-medium">Mô tả</div>
              <div>{Course?.description}</div>
              <div className="font-medium">Độ khó</div>
              <div>{Course?.level}</div>
            </div>
          </div>
        </div>
        <div className="w-4/12 font-semibold overflow-y-scroll">
          <div className="py-3 px-10 border-b border-grey500">
            Nội dung khóa học
          </div>
          {Parts.map((part) => (
            <>
              <div
                onClick={() => setPart(part)}
                className={`py-5 px-10 border-b border-grey500 hover:bg-offwhite text-lg ${
                  Ipart == part ? "bg-offwhite" : "bg-grey500"
                }`}
              >
                {part?.title}
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
};
