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
                <div className="font-medium mb-3">Khóa: {Course?.title}</div>
                <div className="font-medium mb-3">Độ khó: {Course?.level}</div>
                <div className="font-medium">Mô tả: </div>
                <div>{Course?.description}</div>
              </div>
            </div>
          </div>
          <div className="w-4/12 font-semibold max-h-screen overflow-y-scroll">
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
                  {account.img ? (
                    <img className="w-10 mr-3 rounded-full" src={account.img} />
                  ) : (
                    <img
                      className="w-10 mr-3"
                      src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    />
                  )}
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
                {comment.user.img ? (
                  <img
                    className="w-10 mr-3 rounded-full"
                    src={comment.user.img}
                  />
                ) : (
                  <img
                    className="w-10 mr-3"
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  />
                )}
                {comment.user.name}
              </div>
              <div className="ml-1">{comment.comment}</div>
              <div className="ml-1">{printRating(comment?.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
