import { useRecoilValue } from "recoil";
import paymentsucess from "../../assets/Paymentsuccessful21.png";
import { getTitem } from "../../utils/localStorageExtension";
import { formatDateToDDMMYYYY } from "../../utils/util";
import { api } from "../../api/api";
import { accountState } from "../../atom/accountState";
import { useEffect } from "react";

export const PaymentSucess = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState)
  const cartCourse = getTitem("cartCourse");
  const cartTool = getTitem("cartTool");
  const orderCourses = cartCourse.map((cart) => cart.course);
  const orderTools = cartTool.map((cart) => cart.tool);
  const totalCourseCart = orderCourses.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price,
    0
  );
  const totalToolCart = orderTools.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price,
    0
  );
  const orderCourseData = {
    user:{username: account?.sub},
    total: totalCourseCart,
    orderDate: formatDateToDDMMYYYY(new Date()),
    courses: orderCourses,
    status: "paid",
    paymentMethod: "Paypal"

  }
  const orderToolData = {
    user:{username: account?.sub},
    total: totalToolCart,
    orderDate: formatDateToDDMMYYYY(new Date()),
    items: orderTools,
    status: "paid",
    paymentMethod: "Paypal"

  }

  const order = async () => {
    const resOrderCourse = await api.orderCourse(orderCourseData)
    console.log(resOrderCourse)
    const resOrderTool = await api.orderTool(orderToolData)
    console.log(resOrderTool)

    localStorage.removeItem('cartCourse');
    localStorage.removeItem('cartTool');
  }

  useEffect(() => {
    if(account?.sub !== undefined){
      order()
    }
  },[])
  
  return (
    <>
      <img src={paymentsucess} className="w-full" />
    </>
  );
};
