
import * as React from "react";
import { useState } from "react";
import { GlobeAltIcon, DevicePhoneMobileIcon, CircleStackIcon, CloudIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

// interface Name {
//     tool: string;
//     imageSrc: string;
//     type: string
//     price: string
//     category: 'Paints' | 'Drawing' | 'Brushes' | 'Mediums, Gels, Gessos, Vanishes & Cleaners' | 'Packs and Sets' | 'Books & Accessories' | 'Easels';
// }

const names = [
    {
        tool: 'Water Colour Paints',
        imageSrc: '/assets/tool/toolOne.svg',
        type: 'Winsor & Newton Artisan Water Mixable Oil Colour 37ml',
        price: '40',
        category: 'Paints'
    },
    {
        tool: 'Pencils',
        imageSrc: '/assets/tool/toolTwo.svg',
        type: 'Derwent Inktense Pencil',
        price: '21',
        category: 'Drawing'
    },
    {
        tool: 'Artist Paint Brushes',
        imageSrc: '/assets/tool/toolThree.svg',
        type: 'Robert Wade 980 Taklon Long Flat Brush',
        price: '21',
        category: 'Brushes'
    },
    {
        tool: ' Cleaners for Artists ',
        imageSrc: '/assets/tool/toolFour.svg',
        type: 'Gamblin Gamsol Odorless Mineral Spirits',
        price: '99',
        category: 'Mediums, Gels, Gessos, Vanishes & Cleaners'
    },
    {
        tool: 'Packs',
        imageSrc: '/assets/tool/toolOne.svg',
        type: 'Micador Watercolour Disc Packs',
        price: '89',
        category: 'Packs and Sets'
    },
    {
        tool: 'Art Tutorial Books ',
        imageSrc: '/assets/tool/toolTwo.svg',
        type: 'Leonardo Collection Volume 48, Tricks of the Trade',
        price: '89',
        category: 'Books & Accessories'
    },
    {
        tool: 'Tables',
        imageSrc: '/assets/tool/toolThree.svg',
        type: 'A2 Table Top Easel (Bulky Item Shipping may apply)',
        price: '69',
        category: 'Easels'
    }
];

const NamesList = () => {

    const [selectedButton, setSelectedButton] = useState<'Paints' | 'Drawing' | 'Brushes' | 'Mediums, Gels, Gessos, Vanishes & Cleaners' | 'Packs and Sets' | 'Books & Accessories' | 'Easels' | 'all' | null>('Paints');

    const Paint = names.filter((name) => name.category === 'Paints');
    const Drawing = names.filter((name) => name.category === 'Drawing');
    const Brush = names.filter((name) => name.category === 'Brushes');
    const Medium = names.filter((name) => name.category === 'Mediums, Gels, Gessos, Vanishes & Cleaners');
    const Pack = names.filter((name) => name.category === 'Packs and Sets');
    const Book = names.filter((name) => name.category === 'Books & Accessories');
    const Easel = names.filter((name) => name.category === 'Easels');


    let selectedNames = [];
    
    if (selectedButton === 'Paints') {
        selectedNames = Paint;
    } else if (selectedButton === 'Drawing') {
        selectedNames = Drawing;
    } else if (selectedButton === 'Brushes') {
        selectedNames = Brush;
    } else if (selectedButton === 'Mediums, Gels, Gessos, Vanishes & Cleaners') {
        selectedNames = Medium;
    } else if (selectedButton === 'Packs and Sets') {
        selectedNames = Pack;
    } else if (selectedButton === 'Books & Accessories') {
        selectedNames = Book;
    } else if (selectedButton === 'Easels') {
        selectedNames = Easel
    }


    const nameElements = selectedNames.map((name, index) => (

        <div key={index}>
            <div className=" text-lg sm:text-sm py-5 lg:py-0">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                    <img
                        src={name.imageSrc}
                        alt={name.imageSrc}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className='flex justify-between'>
                    <div className="mt-6 block font-normal text-gray-900">
                        {name.tool}
                    </div>
                    <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                        ${name.price}
                    </div>
                </div>
                <p aria-hidden="true" className="mt-2 mb-5 text-2xl font-semibold ">
                    {name.type}
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
        </div>
    ));


    return (
        <div>
                                            {/*mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8*/}
            <div id='tools-section' className="mx-auto max-w-2xl py-16 px-4 sm:py-36 sm:px-6 lg:max-w-7xl lg:px-8">

                <div className='sm:flex justify-between items-center pb-12'>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Popular Tools</h2>
                    <div>
                    <Link to="/Tool" type="button" className='bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded'>Explore more Tools</Link>
                    </div>
                </div>


                <div className='flex nowhitespace space-x-5 rounded-xl bg-white p-1 overflow-x-auto'>

                    {/* FOR DESKTOP VIEW */}
                    <button onClick={() => setSelectedButton('Paints')} className={"bg-white " + (selectedButton === 'Paints' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Paints</button>
                    <button onClick={() => setSelectedButton('Drawing')} className={"bg-white " + (selectedButton === 'Drawing' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Drawing</button>
                    <button onClick={() => setSelectedButton('Brushes')} className={"bg-white " + (selectedButton === 'Brushes' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Brushes</button>
                    <button onClick={() => setSelectedButton('Mediums, Gels, Gessos, Vanishes & Cleaners')} className={"bg-white " + (selectedButton === 'Mediums, Gels, Gessos, Vanishes & Cleaners' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Mediums, Gels, Gessos, Vanishes & Cleaners</button>
                    <button onClick={() => setSelectedButton('Packs and Sets')} className={"bg-white " + (selectedButton === 'Packs and Sets' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Packs and Sets</button>
                    <button onClick={() => setSelectedButton('Books & Accessories')} className={"bg-white " + (selectedButton === 'Books & Accessories' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Books & Accessories</button>
                    <button onClick={() => setSelectedButton('Easels')} className={"bg-white " + (selectedButton === 'Easels' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Easels</button>

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
}

export default NamesList;




