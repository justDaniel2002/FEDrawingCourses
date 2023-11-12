import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../../data/data";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { api } from "../../api/api";


const Orders = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [Order, setOrder] = useState([]);

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
                  <button onClick={async() => {await api.setStatusOrderCourse(account.token, order.id); await callback()}} className="text-white p-2 bg-buttonBlue rounded-xl">
                    Check out
                  </button>
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

export const OrderTool = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState);
  const [Order, setOrder] = useState([]);

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
                  <button onClick={async() => {await api.setStatusOrderItems(account.token, order.id, order); await callback()}} className="text-white p-2 bg-buttonBlue rounded-xl">
                    Check out
                  </button>
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

export default Orders;
