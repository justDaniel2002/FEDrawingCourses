import { useEffect, useState } from "react";
import { studyingCourses } from "../../data/StudyingCourse";
import { Form, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";

export const StudyingCourses = () => {
  const [Parts, setParts] = useState([]);
  const [Ipart, setPart] = useState();
  const [Course, setCourse] = useState();
  const account = useRecoilValue(accountState);

  const { courseId } = useParams();

  useEffect(() => {
    const callback = async () => {
      const courseLessions = await api.getCourseDetails(courseId);
      console.log("courseLessions", courseLessions);
      setParts(courseLessions);
      const getCourse = await api.getCourseById(courseId);
      setCourse(getCourse);
      setPart(courseLessions[0]);
      console.log("getCourse", getCourse);
    };

    callback();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-8/12">
            <div>
              <iframe
                className="w-full h-96"
                src={`https://www.youtube.com/embed/${Ipart?.url}`}
              ></iframe>
            </div>

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
        <div className="px-20 mt-10">
          <div className="mb-5 items-center">
            {account?.sub ? (
              <Form method="post" onSubmit={(event) => submitComment(event)}>
                <div className="text-xl w-1/5 font-bold mb-2 ml-1 flex items-center">
                  <img
                    className="w-1/5 mr-3"
                    src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                  />
                  {account?.sub}
                </div>
                <input
                  name="comment"
                  required
                  className="border p-2 rounded-full w-4/5 mr-3 ml-3"
                  placeholder={`${account?.sub} comment your thought`}
                />
                <button className="p-3 rounded-3xl bg-black text-white font-medium hover:bg-white hover:text-black">
                  Comment
                </button>
              </Form>
            ) : (
              <div>Sign in to comment</div>
            )}
          </div>
          {Course?.comments?.map((comment) => (
            <div className="mb-5">
              <div className="text-xl font-bold flex items-center mb-3">
                <img
                  className="w-10 mr-3"
                  src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                />
                {comment.user.name}
              </div>
              <div className="ml-1">{comment.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
