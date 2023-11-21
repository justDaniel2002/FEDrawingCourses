import { api } from "../../../api/api"


export const mentorOrderHistoryLoader = async({params}) => {
    const orderHistory = await api.getOrderCourseByInstructor(params.username)
    return orderHistory
}