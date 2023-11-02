import { api } from "../../api/api"

export const orderHistoryLoader = async({params}) => {
    const orderHistory = await api.getOrderHistory(params.username)
    orderHistory.sort((a, b) => a.id - b.id)
    const orderToolHistory = await api.getOrderToolHistory(params.username)
    orderToolHistory.sort((a, b) => a.id - b.id)
    return {orderHistory, orderToolHistory}
}