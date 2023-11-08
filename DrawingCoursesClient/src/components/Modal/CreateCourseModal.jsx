import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { api } from "../../api/api";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";

export const CreateCourseModal = ({ handelclose, course }) => {
  const account = useRecoilValue(accountState);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const callBack = async () => {
      const categories = await api.getCourseCategory();
      setCourseCategories(categories);
    };

    callBack();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data.category = { id: formData.get("categoryId") };

    data.user = {
      username: account.sub,
    };

    const imageFormData = new FormData();
    imageFormData.set("image", data.image);

    if (course) {
      await api.editCourse(data, account.token);

      if (data.image.name.length > 0) {
        await api.postCourseImage(imageFormData, data.id);
      }
    } else {
      const course = await api.postCourse(data, account.token);
      if (course) {
        await api.postCourseImage(imageFormData, course.id);
      }
    }
    handelclose();
  };
  return (
    <>
      <Form onSubmit={submit} method="post" className="w-full">
        <input name="id" hidden value={course?.id} />
        <label>Title</label>
        <input
          name="title"
          placeholder="title"
          required
          className="border p-2 rounded-xl w-full mb-3"
          defaultValue={course?.title}
        />
        <label>Description</label>
        <textarea
          name="description"
          className="border h-36 rounded-xl w-full mb-3"
          required
        >
          {course?.description}
        </textarea>
        <label>Price</label>
        <input
          name="price"
          pattern="[0-9]*"
          placeholder="price"
          min={1}
          className="border p-2 rounded-xl w-full mb-3"
          defaultValue={course?.price}
        />
        <label>Image</label>
        <input
          name="image"
          className="border p-2 rounded-xl w-full mb-3"
          placeholder="image"
          type="file"
        />
        <div className="flex mb-5">
          <div className="w-1/2 mr-3">
            <label>Level</label>
            <select name="level" className="border p-2 rounded-xl w-full">
              <option value={"BEGINNER"}>BEGINNER</option>
              <option value={"ADVANCED"}>ADVANCED</option>
              <option value={"INTERMEDIATE"}>INTERMEDIATE</option>
            </select>
          </div>
          <div className="w-1/2">
            <label>Category</label>
            <select name="categoryId" className="border p-2 rounded-xl w-full">
              {courseCategories?.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-right">
          <button className="p-2 rounded-xl bg-buttonBlue text-white">
            {course ? "Edit Course" : "Create Course"}
          </button>
        </div>
      </Form>
    </>
  );
};
