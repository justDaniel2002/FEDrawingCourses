export const mentorPageLoader = async({params}) => {
    const getCourses = await api.getCourseByInstructor(params.username)
    return getCourses
}