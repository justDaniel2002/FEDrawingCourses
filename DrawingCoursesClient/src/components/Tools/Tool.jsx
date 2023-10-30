import * as React from "react";
import { useState, useEffect } from "react";
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toolData } from "../../data/data";
import { api } from "../../api/api";

// interface Name {
//     tool: string;
//     imageSrc: string;
//     type: string
//     price: string
//     category: 'Paints' | 'Drawing' | 'Brushes' | 'Mediums, Gels, Gessos, Vanishes & Cleaners' | 'Packs and Sets' | 'Books & Accessories' | 'Easels';
// }

const Tool = () => {
  const [tools, setTools] = useState([]);
  const [selectedButton, setSelectedButton] = useState();
  const [toolCatgories, setToolCategories] = useState([]);

  useEffect(() => {
    const callBack = async () => {
      const getTools = await api.getTools();
      setTools(getTools);
      const categories = await api.getTooleCategory();
      setToolCategories(categories);
      setSelectedButton(categories[0].name);
    };

    callBack();
  }, []);

  let selectedNames = tools.filter((t) => t.category.name === selectedButton);

  const nameElements = selectedNames.map((name, index) => (
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
  ));

  return (
    <div>
      {/*mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8*/}
      <div
        id="tools-section"
        className="mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div className="sm:flex justify-between items-center pb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">
            Popular Tools
          </h2>
          <div>
            <Link
              to="/Tool"
              type="button"
              className="bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded"
            >
              Explore more Tools
            </Link>
          </div>
        </div>

        <div className="flex nowhitespace space-x-5 rounded-xl bg-white p-1 overflow-x-auto">
          {/* FOR DESKTOP VIEW */}

          {toolCatgories?.map((category) => (
            <button
              onClick={() => setSelectedButton(category.name)}
              className={
                "bg-white " +
                (selectedButton === category.name
                  ? "text-black border-b-2 border-orange"
                  : "text-lightgrey") +
                " pb-2 text-lg hidden sm:block"
              }
            >
              {category.name}
            </button>
          ))}

          {/* FOR MOBILE VIEW */}
          {/* <GlobeAltIcon onClick={() => setSelectedButton('')} width={70} height={70} className={"bg-white " + (selectedButton === 'Beginner Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <DevicePhoneMobileIcon onClick={() => setSelectedButton('Elementary Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Elementary Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CircleStackIcon onClick={() => setSelectedButton('Intermediate Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Intermediate Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CloudIcon onClick={() => setSelectedButton('Upper-intermediate Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Upper-intermediate Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} /> */}
        </div>

        <div>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-12">
              <div className="col-start-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
                {nameElements.length > 0 ? (
                  nameElements
                ) : (
                  <p>No data to show</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tool;
