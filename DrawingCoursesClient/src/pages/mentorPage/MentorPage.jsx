import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CreateCourseModal } from "../../components/Modal/CreateCourseModal";
import { tryGetAccount } from "../../utils/util";
import { LessionsModal } from "../../components/Modal/LessionsModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const MentorPage = () => {
  window.scrollTo(0, 0);
  const [account, setAccount] = useRecoilState(accountState);
  const [courses, setCourses] = useState();
  const [editCourse, setEditCourse] = useState();
  const [editLession, setEditLession] = useState([]);
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenL = () => setOpenL(true);
  const handleClose = async () => {
    setOpen(false);
    setOpenL(false)
    const getCourses = await api.getCourseByInstructor(account?.sub);
    setCourses(getCourses);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const localAccount = tryGetAccount();
    setAccount(localAccount);
    const callBack = async () => {
      const getCourses = await api.getCourseByInstructor(localAccount?.sub);
      setCourses(getCourses);
    };
    callBack();
  }, []);
  return (
    <>
      <div className="bg-buttonBlue text-white pt-10 px-20">
        <div className="flex justify-between mb-5 pb-14 items-center">
          <div className="text-xl font-light">Instructor Dashboard</div>
          <div className="flex">
            <button className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue mr-10">
              Order history
            </button>
            <button
              onClick={() => {
                setEditCourse(undefined);
                handleOpen();
              }}
              className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue mr-10"
            >
              Create a new course
            </button>
            <button
              className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue"
              onClick={() => {
                localStorage.clear();
                setAccount(undefined);
                navigate("/auth/login");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
        {/* <div className="flex">
          <Link className="pb-3 mr-20" to={"/"}>
            Courses
          </Link>
          <Link className="pb-3" to={"/"}>
            Review
          </Link>
        </div> */}
      </div>
      {/* <div className=" py-10 px-20 flex">
        <div className="w-1/4">
          Total Revenue
          <div>$0</div>
        </div>
        <div className="w-1/4">
          Total Students
          <div>0</div>
        </div>
      </div> */}

      {/* <div className="my-10 px-60">
        <input
          className="p-2 border border-grey500"
          placeholder="Search course"
        />
        <button className="p-2 bg-grey500">Search</button>
      </div> */}

      <div className="px-40 mt-20">
        {courses?.map((course) => (
          <>
            <div className="flex mb-10 p-5 border border-grey500 justify-between">
              <img className="w-1/4 mr-10" src={course.img} />
              <div className="w-2/4 mr-10 flex flex-col justify-between">
                <div className="text-2xl font-semibold">{course.title}</div>
                <div className="text-sm">
                  {course.category.name} - {course.price}$
                </div>
                {/* <div className="font-thin mb-5">
                  Created By: {course.user.name}
                </div> */}
                <div className="text-right">{course.createdDate}</div>
              </div>
              <div className="self-center">
                <button
                  onClick={() => {
                    setEditCourse(course);
                    handleOpen();
                  }}
                  className="block mb-3 p-2 bg-buttonBlue text-white rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={async() => {
                    const getLesssions = await api.getCourseDetails(course.id)
                    setEditLession(getLesssions);
                    setEditCourse(course);
                    handleOpenL();
                  }}
                  className="block mb-3 p-2 bg-buttonBlue text-white rounded-xl"
                >
                  Detail
                </button>

                <button
                  onClick={async () => {
                    await api.delCourse(course.id, account.token);
                    const getCourses = await api.getCourseByInstructor(
                      account?.sub
                    );
                    setCourses(getCourses);
                  }}
                  className="block mb-3 p-2 bg-red text-white rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateCourseModal handelclose={handleClose} course={editCourse} />
        </Box>
      </Modal>

      <Modal
        open={openL}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LessionsModal handelClose={handleClose} LessionsState={editLession} courseId={editCourse?.id} />
        </Box>
      </Modal>
    </>
  );
};
