import { useEffect, useState } from "react"
import Header from "../../components/Header";
import TopCards from "../../components/TopCards";
import BarChart from "../../components/BarChart";
import RecentOrders from "../../components/RecentOrders";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { api } from "../../api/api";

export default function Admin() {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState)
  const [Revenue, setRevenue] = useState(0)
  const [Customers, setCustomers] = useState([])
  const [Order, setOrder] = useState([])
  const [MOrder, setMOrder] = useState([])

  const callback = async() => {
    const OrdersCourse = await api.getOrderCourse(account.token)
    const OrderTool = await api.getOrderTool(account.token)
    const getCus = await api.getAllUser(account.token)

    const MOrdersCourse = await api.getMonthlyOrderCourse(account.token)
    const MOrderTool = await api.getMonthlyOrderTool(account.token)

    const sum1 = OrdersCourse.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);

    const sum2 = OrderTool.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);

    setOrder([...OrdersCourse, ...OrderTool])
    setMOrder([...MOrdersCourse])
    setCustomers(getCus)
    setRevenue(sum1 + sum2)
  }
  useEffect(() => {
    callback()
  },[])
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <TopCards Total={Revenue} NOC={Customers.length} />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart order={MOrder}/>
          <RecentOrders order={Order} />
        </div>
      </main>
    </>
  );
}
