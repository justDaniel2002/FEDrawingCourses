import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { coursesData } from "../../data/data";
import "../../css/counter.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, courseCartState } from "../../atom/accountState";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";

const CourseDetail = () => {
  const { id } = useParams();
  const account = useRecoilValue(accountState);
  const [MyCourse, setMyCourse] = useState([]);
  const [courseCart, setCourseCart] = useRecoilState(courseCartState);
  const [course, setCourse] = useState();
  const [quantity, setQuantity] = useState(1);
  const [coursesWSC, setCoursesWSC] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callBack = async () => {
      const getCourse = await api.getCourseById(id);
      setCourse(getCourse);
      const getMyCourses = await api.getMyCourses(account?.sub);
      setMyCourse(getMyCourses);
      const getCoursesWSC = await api.getCourseByCategory(
        getCourse?.category.id
      );
      setCoursesWSC(getCoursesWSC);
    };

    callBack();
    window.scrollTo(0, 0);
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

  const submitComment = async (event) => {
    event.preventDefault(); // Prevent the form from actually submitting

    // Get the form element from the event target
    const form = event.target;
    const comment = form.elements.comment.value;
    if (comment.length > 0) {
      const data = {
        user: {
          username: account.sub,
        },
        courseId: id,
        comment: comment,
      };

      const result = await api.postComment(data);
      if (result == "Comment added successfully") {
        const getCourse = await api.getCourseById(id);
        setCourse(getCourse);
        document.querySelector("input[name='comment']").value = "";
      }
    }
  };

  const RatingIcon = () => (
    <span className="text-starYellow">
      <StarIcon />
    </span>
  );

  const printRating = (n) => {
    const ratingArray = [];
    for (let i = 0; i < n; i++) {
      ratingArray.push(<RatingIcon key={i} />);
    }
    return ratingArray;
  };

  return (
    <div className=" mt-40 px-40">
      <div className="flex items-center">
        <div className="product-image w-3/6 mr-20">
          <img src={course?.img} alt={course?.title} className="w-full" />
        </div>
        <div className="product-info w-3/6">
          <div className="mb-3 product-name mr-10 flex justify-between items-center font-bold text-3xl">
            <div className="w-9/12">{course?.title}</div>
            <div className="w-3/12 text-center text-green font-bold ">
              <span className="rounded-xl border-2 border-green p-1">
                {course?.price} $
              </span>
            </div>
          </div>
          <div className="flex mb-10 text-starYellow">
            {printRating(course?.rating)}
          </div>
          <p className="product-description">
            Category: {course?.category.name}
          </p>
          <p
            className={`product-description font-medium text-white ${
              course?.level === "BEGINNER"
                ? "bg-green"
                : course?.level === "INTERMEDIATE"
                ? "bg-#ffc640"
                : course?.level === "ADVANCED"
                ? "bg-#f2aa00"
                : "bg-green"
            } text-xl mt-3 p-2 inline-block rounded-lg`}
          >
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
              onClick={() => {
                MyCourse.some((Mcourse) => Mcourse.id === course.id)
                  ? ""
                  : onAddToCart();
              }}
              className="product-add-to-cart border p-2 rounded-xl font-medium mt-5 hover:bg-black hover:text-white hover:p-3 transition-all"
            >
              {MyCourse.some((Mcourse) => Mcourse.id === course.id)
                ? "Paid"
                : "Add to Cart"}
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
      <button className="rounded-full py-3 text-white px-10 font-semibold bg-gradient-to-r from-#04a3b8 to-#7eb8bf my-5">
        Description
      </button>
      <div>{course?.description}</div>
      <div className="rounded-2xl p-5 mt-10">
        {course?.comments?.map((comment) => (
          <div className="mb-5">
            <div className="text-xl font-bold flex items-center mb-3">
              <img
                className="w-10 mr-3"
                src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
              />
              {comment.user.name}
            </div>
            <div className="ml-1">{comment.comment}</div>
          </div>
        ))}
        <div className="text-4xl text-center font-bold my-10">
          Related Courses
        </div>

        <div className="flex justify-center">
          {coursesWSC.slice(0, 4).map((name, index) => (
            <div
              onClick={() => {
                setCourse(name);
                window.scrollTo(0, 0);
              }}
              className="block w-1/4 px-3"
              key={index}
            >
              <div className=" text-lg sm:text-sm py-5 lg:py-0">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={name.img}
                    alt={name.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="mt-6 block font-normal text-gray-900 truncate">
                    {name.title}
                  </div>
                  <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                    {MyCourse.some((course) => course.id === name.id) ? (
                      "Paid"
                    ) : (
                      <>${name.price}</>
                    )}
                  </div>
                </div>
                <p
                  aria-hidden="true"
                  className="mt-2 mb-5 text-2xl font-semibold truncate"
                >
                  {name.description}
                </p>

                <div className="flex justify-between border-solid border-2 border-grey500 rounded-md p-2">
                  <p>12 Classes</p>
                  <div className="flex flex-row space-x-4">
                    <div className="flex">
                      <img src={"/assets/courses/account.svg"} alt="circle" />
                      <p className="text-lightgrey ml-1">120</p>
                    </div>
                    <div className="flex">
                      <img src={"/assets/courses/Star.svg"} alt="star" />
                      <p className="ml-1">{name.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
