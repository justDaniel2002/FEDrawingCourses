import { coursesData } from "../../data/data";

export const MentorPage = () => {
  return (
    <>
      <div className="border-2 rounded-xl">
        <div class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10">
          <table class="table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2 text-emerald-600">Course</th>
                <th class="px-4 py-2 text-emerald-600">Image</th>
                <th class="px-4 py-2 text-emerald-600">Description</th>
                <th class="px-4 py-2 text-emerald-600">Price</th>
                <th class="px-4 py-2 text-emerald-600">Category</th>
                <th class="px-4 py-2 text-emerald-600">CreateDate</th>
                <th class="px-4 py-2 text-emerald-600"></th>
              </tr>
            </thead>
            <tbody>
              {coursesData.map((course) => (
                <tr>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    {course.course}
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    <img src={course.imageSrc}/>
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    {course.profession}
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    {course.price}
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    {course.category}
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    {course.createdDate}
                  </td>
                  <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                    <button className="block mb-3 p-2 bg-buttonBlue text-white rounded-xl">Detail</button>
                    <button className="block mb-3 p-2 bg-buttonBlue text-white rounded-xl">Edit</button>
                    <button className="block mb-3 p-2 bg-red text-white rounded-xl">Delete</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
