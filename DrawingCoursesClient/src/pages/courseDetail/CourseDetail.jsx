import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { coursesData } from "../../data/data";
import "../../css/counter.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, courseCartState } from "../../atom/accountState";
import { api } from "../../api/api";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const account = useRecoilValue(accountState);
  const [courseCart, setCourseCart] = useRecoilState(courseCartState);
  const [course, setCourse] = useState();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const callBack = async () => {
      const getCourse = await api.getCourseById(id);
      setCourse(getCourse);
    };

    callBack();
  }, []);

  const onAddToCart = async () => {
    const findCourse = courseCart.find((cart) => cart.course.id === course.id);
    if (findCourse) {
      toast("This course has already in your cart", { type: toast.TYPE.INFO });
    } else {
      setCourseCart([
        ...courseCart,
        {
          course,
          quantity,
        },
      ]);

      navigate("/cart");
    }
  };

  const submitComment = (event) => {
    event.preventDefault(); // Prevent the form from actually submitting

    // Get the form element from the event target
    const form = event.target;
    const comment = form.elements.comment.value;
    const data = {
      "user":{
          "id":1
      },
      "courseId":1,
      "comment":"awesome"
  }
  };

  return (
    <div className="product-page mt-40 pb-40 px-40">
      <div className="flex items-center">
        <div className="product-image w-3/6 mr-20">
          <img src={course?.img} alt={course?.title} className="w-full" />
        </div>
        <div className="product-info w-3/6">
          <div className="product-name mb-10 flex justify-between items-center">
            <div>{course?.title}</div>
            <div className="text-green font-bold border-2 border-green p-1 rounded-xl">
              $ {course?.price}
            </div>
          </div>
          <p className="product-description font-bold text-3xl">
            {course?.category.name}
          </p>
          <p className="product-description font-medium text-white bg-black text-xl mt-3 p-2 inline-block rounded-lg">
            {course?.level}
          </p>

          {/* counter */}
          {/* <div className="custom-number-input h-10 w-32 my-10">
          <label
            for="custom-input-number"
            className="w-full text-gray-700 text-sm font-semibold"
          >
            Quantity
          </label>
          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              onChange={(event) => {
                if (event.target.value > 0 && event.target.value < 100) {
                  setQuantity(event.target.value);
                }
              }}
              type="number"
              max={99}
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
              name="custom-input-number"
              value={quantity}
            ></input>
            <button
              onClick={() => {
                if (quantity < 99) {
                  setQuantity(quantity - 1 + 2);
                }
              }}
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div> */}
          <br />
          {account?.sub ? (
            <button
              onClick={onAddToCart}
              className="product-add-to-cart border p-2 rounded-xl font-medium mt-5 hover:bg-black hover:text-white hover:p-3 transition-all"
            >
              Add to Cart
            </button>
          ) : (
            <Link
              to={"/auth/login"}
              className="inline-block product-add-to-cart border p-2 rounded-xl font-medium mt-5 hover:bg-black hover:text-white hover:p-3 transition-all"
            >
              Sign in to order
            </Link>
          )}
        </div>
      </div>
      <div className="border rounded-2xl p-5 mt-10">
        <div className="mb-5 items-center">
          {account?.sub ? (
            <Form method="post">
              <div className="1/5 font-bold mb-2 ml-1">{account?.sub}</div>
              <input
                name="comment"
                required
                className="border p-2 rounded-full w-4/5 mr-3"
                placeholder={`${account?.sub} comment your thought`}
              />
              <button
                onClick={(event) => submitComment(event)}
                className="p-3 rounded-3xl bg-black text-white font-medium hover:bg-white hover:text-black"
              >
                Comment
              </button>
            </Form>
          ) : (
            <div>Sign in to comment</div>
          )}
        </div>
        {course?.comments?.map((comment) => (
          <div className="mb-5">
            <div className="text-sm font-semibold">{comment.user.name}</div>
            <div className="ml-1">{comment.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
