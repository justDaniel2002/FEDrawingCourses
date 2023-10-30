import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toolData } from "../../data/data";
import { accountState, toolCartState } from "../../atom/accountState";
import { useRecoilState, useRecoilValue } from "recoil";
import { api } from "../../api/api";

const ToolDetail = () => {
  const { id } = useParams();
  const account = useRecoilValue(accountState);
  const [toolCart, setToolCart] = useRecoilState(toolCartState);
  const [tool, setTool] = useState();
  const [quantity, setQuantity] = useState(1);
  const [relateTool, setRelateTool] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const callback = async () => {
      const getTool = await api.getToolById(id);
      setTool(getTool);
      const tools = await api.getTools();
      const relateTools = tools.filter(
        (tool) => tool.category.id === getTool.category.id
      );
      setRelateTool(relateTools);
    };

    callback();
  }, []);

  const onAddToCart = async () => {
    let updateCart = [...toolCart];
    let findTool = updateCart.find((cart) => cart.tool.id === tool.id);
    if (findTool) {
      const index = updateCart.indexOf(findTool);
      let updateTool = { ...findTool, quantity: findTool.quantity + quantity };
      updateCart[index] = updateTool;
      setToolCart(updateCart);
    } else {
      setToolCart([
        ...toolCart,
        {
          tool,
          quantity,
        },
      ]);
    }

    navigate("/cart");
  };

  const printRating = (n) => {
    const ratingArray = [];
    for (let i = 0; i < n; i++) {
      ratingArray.push(<RatingIcon key={i} />);
    }
    return ratingArray;
  };

  return (
    <>
      <div className="mt-40 px-40">
        <div className=" flex items-center">
          <div className="product-image w-3/6 mr-20">
            <img src={tool?.img} alt={tool?.name} className="w-full" />
          </div>
          <div className="product-info w-3/6">
            <div className="mb-3 product-name mr-10 flex justify-between items-center font-bold text-3xl">
              <div className="w-9/12">{tool?.name}</div>
              <div className="w-3/12 text-center text-green font-bold ">
                <span className="rounded-xl border-2 border-green p-1">
                  {tool?.price} $
                </span>
              </div>
            </div>
            <div className="flex mb-10 text-starYellow">
              {printRating(tool?.rating)}
            </div>
            <p>Category: {tool?.category.name}</p>

            {/* counter */}
            <div className="custom-number-input h-10 w-32 my-10">
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
            </div>

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
        <button className="rounded-full py-3 text-white px-10 font-semibold bg-gradient-to-r from-#04a3b8 to-#7eb8bf my-5">
          Description
        </button>
        <div className="">{tool?.description}</div>
      </div>

      <div className="text-4xl text-center font-bold my-10">
          Related Tools
        </div>
      <div className="flex justify-center">
          {relateTool.slice(0, 4).map((name, index) => (
            <div
              onClick={() => {
                setTool(name);
                window.scrollTo(0, 0);
              }}
              className="block w-1/4 px-3"
              key={index}
            >
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
                <p
                  aria-hidden="true"
                  className="mt-2 mb-5 text-2xl font-semibold truncate"
                >
                  {name.name}
                </p>

                {/* <div className="flex justify-between border-solid border-2 border-grey500 rounded-md p-2">
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
                </div> */}
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default ToolDetail;
