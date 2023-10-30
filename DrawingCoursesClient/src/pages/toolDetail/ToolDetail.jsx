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
  

  const navigate = useNavigate();

  useEffect(() => {
    const callback = async () => {
      const getTool = await api.getToolById(id);
      setTool(getTool);
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
    </>
  );
};

export default ToolDetail;
