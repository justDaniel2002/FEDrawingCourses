import { api } from "../../api/api"

export const mentorDetailLoader = async ({params}) => {
    const data = await api.getUser(params.username)
    const courses = await api.getCourseByInstructor(params.username)
    return {mentor: data.user, courses}
}