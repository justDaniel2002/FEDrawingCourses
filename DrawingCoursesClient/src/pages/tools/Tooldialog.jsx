
import * as React from "react";
import { useState, useEffect } from "react";
import { GlobeAltIcon, DevicePhoneMobileIcon, CircleStackIcon, CloudIcon } from '@heroicons/react/24/outline';
import SearchTools from './SearchTool';
import { toolData } from "../../data/data";
import { Link } from "react-router-dom";
import { api } from "../../api/api";


// interface Name {
//     tool: string;
//     imageSrc: string;
//     type: string
//     price: string
//     category: 'Paints' | 'Drawing' | 'Brushes' | 'Mediums, Gels, Gessos, Vanishes & Cleaners' | 'Packs and Sets' | 'Books & Accessories' | 'Easels';
// }



const ToolDialog = () => {

    const [tools, setTools] = useState([])
    const [selectedButton, setSelectedButton] = useState('pen');

    useEffect(() => {
        const callBack = async () => {
            const getTools = await api.getTools()
            setTools(getTools)
        }

        callBack()
    },[])

    const Paint = tools.filter((name) => name.category,name === 'pen');
    const Drawing = tools.filter((name) => name.category === 'pencil');
    const Brush = tools.filter((name) => name.category === 'eraser');
    
    

    const AllTool = [...Paint, ...Drawing, ...Brush];

    let selectedNames = [];
    if(selectedButton === 'All Tools'){
        selectedNames = AllTool
    }
    else if (selectedButton === 'pen') {
        selectedNames = Paint;
    } else if (selectedButton === 'pencil') {
        selectedNames = Drawing;
    } else if (selectedButton === 'eraser') {
        selectedNames = Brush;
    } 


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
                <div className='flex justify-between'>
                    <div className="mt-6 block font-normal text-gray-900">
                        {name.name}
                    </div>
                    <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                        ${name.price}
                    </div>
                </div>
                <p aria-hidden="true" className="mt-2 mb-5 text-2xl font-semibold ">
                    {name.description}
                </p>

                <div className='flex justify-between border-solid border-2 border-grey500 rounded-md p-2'>
                    <p>7 Tools</p>
                    <div className='flex flex-row space-x-4'>
                        <div className='flex'>
                            <img src={'/assets/courses/account.svg'} alt="circle" />
                            <p className='text-lightgrey ml-1'>120</p>
                        </div>
                        <div className='flex'>
                            <img src={'/assets/courses/Star.svg'} alt="star" />
                            <p className='ml-1'>4.5</p>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    ));


    return (
        <div>
                                           {/* mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8 */}
            <div id='tools-section' className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8" style={{marginBottom: '15rem'}}>
                <div className="text-center">
                    <h2 className="font-bold text-6xl mt-14">Search Tools</h2>
                    <SearchTools />
                </div>

                <div className='sm:flex justify-between items-center pb-12' style={{paddingBottom: '1rem'}}>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Tools</h2>
                </div>
                
                <div className='flex nowhitespace rounded-xl bg-white p-1 overflow-x-auto' style={{float: 'left', flexDirection: 'column', width: '23%', marginRight: '2%'}}> {/* space-x-5 */}

                    {/* FOR DESKTOP VIEW */}
                    <button onClick={() => setSelectedButton('All Tools')} className={"bg-white " + (selectedButton === 'All Tools' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>All Tools</button>
                    <button onClick={() => setSelectedButton('pen')} className={"bg-white " + (selectedButton === 'pen' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Pens</button>
                    <button onClick={() => setSelectedButton('pencil')} className={"bg-white " + (selectedButton === 'pencil' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Pencils</button>
                    <button onClick={() => setSelectedButton('eraser')} className={"bg-white " + (selectedButton === 'eraser' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Erasers</button>

                    {/* <button onClick={() => setSelectedButton('Mediums, Gels, Gessos, Vanishes & Cleaners')} className={"bg-white " + (selectedButton === 'Mediums, Gels, Gessos, Vanishes & Cleaners' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Mediums, Gels, Gessos, Vanishes & Cleaners</button>
                    <button onClick={() => setSelectedButton('Packs and Sets')} className={"bg-white " + (selectedButton === 'Packs and Sets' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Packs and Sets</button>
                    <button onClick={() => setSelectedButton('Books & Accessories')} className={"bg-white " + (selectedButton === 'Books & Accessories' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Books & Accessories</button>
                    <button onClick={() => setSelectedButton('Easels')} className={"bg-white " + (selectedButton === 'Easels' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Easels</button> */}

                    {/* FOR MOBILE VIEW */}
                    <GlobeAltIcon onClick={() => setSelectedButton('Paints')} width={70} height={70} className={"bg-white " + (selectedButton === 'Paints' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <DevicePhoneMobileIcon onClick={() => setSelectedButton('Drawing')} width={70} height={70} className={"bg-white " + (selectedButton === 'Drawing' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CircleStackIcon onClick={() => setSelectedButton('Brushes')} width={70} height={70} className={"bg-white " + (selectedButton === 'Brushes' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CloudIcon onClick={() => setSelectedButton('Mediums, Gels, Gessos, Vanishes & Cleaners')} width={70} height={70} className={"bg-white " + (selectedButton === 'Mediums, Gels, Gessos, Vanishes & Cleaners' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />

                </div>

                <div>
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-12" style={{paddingTop: '0rem', width: '75%'}}>
                            <div className="col-start-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8" style={{float: 'right'}}>
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
}

export default ToolDialog;