import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../../data/data";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { api } from "../../api/api";
import { Box, Modal } from "@mui/material";
import { CourseListModal } from "../../components/Modal/CourseListModal";
import { ToolListModal } from "../../components/Modal/ToolListModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Orders = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [Order, setOrder] = useState([]);
  const [listCourses, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const callback = async () => {
    const OrdersCourse = await api.getOrderCourse(account.token);

    setOrder(OrdersCourse);
  };
  useEffect(() => {
    callback();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-5 grid-cols-5 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
            <span className="hidden sm:grid">Action</span>
          </div>
          <ul>
            {Order.map((order, id) => (
              <li
                onClick={() => {
                  setList(order.courses);
                  handleOpen();
                }}
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-5 grid-cols-5 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{order.user.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{order.status}</span>
                </p>
                <p className="hidden md:flex">{order.orderDate}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{order.paymentMethod}</p>
                </div>
                <div className="sm:flex hidden justify-between items-center">
                  <button
                    onClick={async () => {
                      await api.setStatusOrderCourse(account.token, order.id);
                      await callback();
                    }}
                    className="text-white p-2 bg-buttonBlue rounded-xl"
                  >
                    Check out
                  </button>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CourseListModal courses={listCourses} />
        </Box>
      </Modal>
    </div>
  );
};

export const OrderTool = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [Order, setOrder] = useState([]);
  const [listTool, setListTool] = useState([]);
  const [openTool, setOpenTool] = useState(false);
  const handleOpenTool = () => setOpenTool(true);
  const handleClose = () => {
    setOpenTool(false);
  };

  const callback = async () => {
    const OrderTool = await api.getOrderTool(account.token);

    setOrder(OrderTool);
  };
  useEffect(() => {
    callback();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-5 grid-cols-5 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
            <span className="hidden sm:grid">Action</span>
          </div>
          <ul>
            {Order.map((order, id) => (
              <li
                onClick={() => {
                  setListTool(order.items);
                  handleOpenTool();
                }}
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-5 grid-cols-5 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{order.user.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{order.status}</span>
                </p>
                <p className="hidden md:flex">{order.orderDate}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{order.paymentMethod}</p>
                </div>
                <div className="sm:flex hidden justify-between items-center">
                  <button
                    onClick={async () => {
                      await api.setStatusOrderItems(
                        account.token,
                        order.id,
                        order
                      );
                      await callback();
                    }}
                    className="text-white p-2 bg-buttonBlue rounded-xl"
                  >
                    Check out
                  </button>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        open={openTool}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ToolListModal tools={listTool} />
        </Box>
      </Modal>
    </div>
  );
};

export default Orders;
