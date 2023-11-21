import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../../atom/accountState";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CreateCourseModal } from "../../../components/Modal/CreateCourseModal";
import { tryGetAccount } from "../../../utils/util";
import { LessionsModal } from "../../../components/Modal/LessionsModal";
import { MentorOrderHistory } from "./MentorOH";

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

export const MentorOHPage = () => {
  window.scrollTo(0, 0);
  const [account, setAccount] = useRecoilState(accountState);
  const [courses, setCourses] = useState();
  const [orderCourse, setOrderCourse] = useState([]);
  const [staticIns, setStatic] = useState([]);
  const [editCourse, setEditCourse] = useState();
  const [editLession, setEditLession] = useState([]);
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenL = () => setOpenL(true);
  const handleClose = async () => {
    setOpen(false);
    setOpenL(false);
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
      const getOrder = await api.getOrderCourseByInstructor(localAccount?.sub);
      setOrderCourse(getOrder);
      const getStatic = await api.getStaticByInstructor(localAccount?.sub);
      setStatic(getStatic);
    };
    callBack();
  }, []);

  return (
    <>
      <div className="bg-buttonBlue text-white pt-10 px-20">
        <div className="flex justify-between mb-5 pb-14 items-center">
          <div className="text-xl font-light">Instructor Dashboard</div>
          <div className="flex">
            <Link to={`/MentorOrderHistoryPage/${account?.sub}`} className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue mr-10">
              Order history
            </Link>
            <Link to={"/MentorPage"} className="p-2 text-buttonBlue bg-white rounded-2xl hover:text-white hover:bg-buttonBlue mr-10">
              Courses
            </Link>
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
      <div className=" py-10 px-20 flex">
        <div className="w-1/4">
          Total Revenue
          <div>${staticIns.reduce((accumulator, currentValue)=>{return accumulator+currentValue.totalRevenue},0)}</div>
        </div>
        <div className="w-1/4">
          Total Student
          <div>{staticIns.reduce((accumulator, currentValue)=>{return accumulator+currentValue.totalStudent},0)}</div>
        </div>
        <div className="w-1/4">
          Total Order
          <div>{orderCourse.length}</div>
        </div>
      </div>

      {/* <div className="my-10 px-60">
        <input
          className="p-2 border border-grey500"
          placeholder="Search course"
        />
        <button className="p-2 bg-grey500">Search</button>
      </div> */}

      <div className="px-40 mt-10">
        <MentorOrderHistory />
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
          <LessionsModal
            handelClose={handleClose}
            LessionsState={editLession}
            courseId={editCourse?.id}
          />
        </Box>
      </Modal>
    </>
  );
};
