import { Link } from "react-router-dom";

export const CourseListModal = ({ courses }) => {
  return (
    <div className="overflow-y-scroll max-h-screen">
      {courses.map((name, index) => (
        <>
          <Link to={`/Course/${name.id}`} className="block" key={index}>
            <div className=" text-lg sm:text-sm py-5 lg:py-0">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={`${name.img}`}
                  alt={name.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between">
                <div className="mt-6 block font-normal text-gray-900 truncate">
                  {name.title}
                </div>
                <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1 truncate">
                  {name.price}
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
          </Link>
        </>
      ))}
    </div>
  );
};
