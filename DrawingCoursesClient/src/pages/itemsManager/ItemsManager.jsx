import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../../data/data";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { api } from "../../api/api";
import { HiTemplate } from "react-icons/hi";
import { CreateToolModal } from "../../components/Modal/CreateToolModal";
import { Box, Modal } from "@mui/material";

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

const ItemsManager = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [Items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTool, setEditTool] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    setOpen(false);
    await callback();
  };

  const callback = async () => {
    const getItems = await api.getTools();

    setItems(getItems);
  };
  useEffect(() => {
    callback();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div>
          <button
            onClick={() => {
              setEditTool(undefined);
              handleOpen();
            }}
            className="p-2 text-white bg-buttonBlue rounded-xl mb-3"
          >
            Create Tool
          </button>
        </div>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-6 grid-cols-6 items-center justify-between cursor-pointer gap-3">
            <span># Tools</span>
            <span className="hidden md:grid">Name</span>
            <span className="hidden sm:grid">Price</span>
            <span className="hidden sm:grid">Category</span>
            <span className="hidden sm:grid">Img</span>
            <span className="hidden sm:grid">Action</span>
          </div>
          <ul>
            {Items.map((item, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-6 grid-cols-6 items-center justify-between cursor-pointer gap-3"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <HiTemplate className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 text-sm">{item.id}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{item.name}</span>
                </p>
                <div className="flex items-center">
                  <div className="bg-purple-100 pr-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span>{item.category.name}</span>
                </p>
                <div className="sm:flex hidden justify-between items-center">
                  <img src={item.img} />
                  <BsThreeDotsVertical />
                </div>

                <div className="pl-5">
                  <div>
                    <button
                      onClick={() => {
                        setEditTool(item);
                        handleOpen();
                      }}
                      className="p-2 text-white bg-buttonBlue rounded-xl mb-3"
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={async () => {
                        await api.delTool(item.id, account.token);
                        await callback();
                      }}
                      className="p-2 text-white bg-red rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
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
          <CreateToolModal handelclose={handleClose} tool={editTool} />
        </Box>
      </Modal>
    </div>
  );
};

export default ItemsManager;
