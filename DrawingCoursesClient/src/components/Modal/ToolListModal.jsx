import { Link } from "react-router-dom";

export const ToolListModal = ({ tools }) => {
  return (
    <div className="overflow-y-scroll max-h-screen">
      {tools.map((name, index) => (
        <>
          <Link to={`/Tool/${name.id}`} className="block" key={index}>
            <div className=" text-lg sm:text-sm py-5 lg:py-0">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={name.img}
                  alt={name.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between">
                <div className="mt-6 block font-normal text-gray-900 truncate">
                  {name.name}
                </div>
                <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                  ${name.price}
                </div>
              </div>
              <div
                aria-hidden="true"
                className="mt-2 mb-5 text-2xl font-semibold truncate"
              >
                {name.name}
              </div>

              <div className="flex justify-between border-solid border-2 border-grey500 rounded-md p-2">
                <p>7 Tools</p>
                <div className="flex flex-row space-x-4">
                  <div className="flex">
                    <img src={"/assets/courses/account.svg"} alt="circle" />
                    <p className="text-lightgrey ml-1">120</p>
                  </div>
                  <div className="flex">
                    <img src={"/assets/courses/Star.svg"} alt="star" />
                    <p className="ml-1">4.5</p>
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
