
import * as React from "react";
import { useState, useEffect } from "react";
import SearchCourses from './SearchCourse';
import { GlobeAltIcon, DevicePhoneMobileIcon, CircleStackIcon, CloudIcon } from '@heroicons/react/24/outline';

// interface Name {
//     course: string;
//     imageSrc: string;
//     profession: string
//     price: string
//     category: 'All Courses'|'Elementary Courses' | 'Beginner Courses' | 'Intermediate Courses' | 'Upper-intermediate Courses';
// }

const names = [
    {
        course: 'Vẽ phông cảnh',
        imageSrc: '/assets/courses/coursesOne.svg',
        profession: 'Vẽ cây thông',
        price: '40',
        category: 'Beginner Courses'
    },
    {
        course: 'Vẽ vật thể',
        imageSrc: '/assets/courses/coursesTwo.svg',
        profession: 'Vẽ con trym',
        price: '21',
        category: 'Beginner Courses'
    },
    {
        course: 'Vẽ tranh tĩnh vật',
        imageSrc: '/assets/courses/coursesThree.svg',
        profession: 'Vẽ quả táo',
        price: '21',
        category: 'Beginner Courses'
    },
    {
        course: 'Vẽ tranh tường',
        imageSrc: '/assets/courses/coursesFour.svg',
        profession: 'Vẽ đàn cò trên cánh đồng',
        price: '99',
        category: 'Beginner Courses'
    },
    {
        course: 'Vẽ tranh trừu tượng',
        imageSrc: '/assets/courses/coursesOne.svg',
        profession: 'Học cách tìm cảm hứng',
        price: '89',
        category: 'Elementary Courses'
    },
    {
        course: 'Vẽ tranh minh họa',
        imageSrc: '/assets/courses/coursesThree.svg',
        profession: 'Vẽ tờ báo',
        price: '89',
        category: 'Elementary Courses'
    },
    {
        course: 'Vẽ tranh phong cảnh',
        imageSrc: '/assets/courses/coursesFour.svg',
        profession: 'Vẽ thành phố',
        price: '69',
        category: 'Elementary Courses'
    },
    {
        course: 'Vẽ tranh mosaic',
        imageSrc: '/assets/courses/coursesTwo.svg',
        profession: 'Vẽ tranh cô gái bằng mảnh vỡ kính',
        price: '69',
        category: 'Elementary Courses'
    },
    {
        course: 'Vẽ tranh khắc',
        imageSrc: '/assets/courses/coursesTwo.svg',
        profession: 'Tạo hình người phụ nữ',
        price: '99',
        category: 'Intermediate Courses'
    },
    {
        course: 'Vẽ tranh trừu tượng',
        imageSrc: '/assets/courses/coursesFour.svg',
        profession: 'Học cách phối màu',
        price: '99',
        category: 'Intermediate Courses'
    },
    {
        course: 'Vẽ tranh minh họa',
        imageSrc: '/assets/courses/coursesOne.svg',
        profession: 'Vẽ một cuốn sách',
        price: '99',
        category: 'Intermediate Courses'
    },
    {
        course: 'Vẽ tranh chân dung',
        imageSrc: '/assets/courses/coursesThree.svg',
        profession: 'Vẽ lại nàng monali Huấn',
        price: '89',
        category: 'Intermediate Courses'
    },
    {
        course: 'Vẽ tranh mosaic',
        imageSrc: '/assets/courses/coursesThree.svg',
        profession: 'Vẽ trang bằng gốm',
        price: '21',
        category: 'Upper-intermediate Courses'
    },
    {
        course: 'Vẽ tranh tĩnh vật',
        imageSrc: '/assets/courses/coursesFour.svg',
        profession: 'Vẽ cái ghế và bàn',
        price: '29',
        category: 'Upper-intermediate Courses'
    },
    {
        course: 'Vẽ tranh trừu tượng',
        imageSrc: '/assets/courses/coursesOne.svg',
        profession: 'Học cách bảo dưỡng',
        price: '99',
        category: 'Upper-intermediate Courses'
    },
    {
        course: 'Vẽ tranh khắc',
        imageSrc: '/assets/courses/coursesTwo.svg',
        profession: 'Học cách vẽ trên kim loại',
        price: '58',
        category: 'Upper-intermediate Courses'
    }
];

const Coursesdialog = () => {

    const [selectedButton, setSelectedButton] = useState('All Courses');
    const ElementaryCourses = names.filter((name) => name.category === 'Elementary Courses');
    const BeginnerCourses = names.filter((name) => name.category === 'Beginner Courses');
    const IntermediateCourses = names.filter((name) => name.category === 'Intermediate Courses');
    const UpperIntermediateCourses = names.filter((name) => name.category === 'Upper-intermediate Courses');

    const AllCourses = [...ElementaryCourses, ...BeginnerCourses, ...IntermediateCourses, ...UpperIntermediateCourses];

    let selectedNames = [];
    if (selectedButton === 'All Courses') {
        selectedNames = AllCourses;
    } else if (selectedButton === 'Elementary Courses') {
        selectedNames = ElementaryCourses;
    } else if (selectedButton === 'Beginner Courses') {
        selectedNames = BeginnerCourses;
    } else if (selectedButton === 'Intermediate Courses') {
        selectedNames = IntermediateCourses;
    } else if (selectedButton === 'Upper-intermediate Courses') {
        selectedNames = UpperIntermediateCourses
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
                        {name.course}
                    </div>
                    <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                        ${name.price}
                    </div>
                </div>
                <p aria-hidden="true" className="mt-2 mb-5 text-2xl font-semibold ">
                    {name.profession}
                </p>

                <div className='flex justify-between border-solid border-2 border-grey500 rounded-md p-2'>
                    <p>12 Classes</p>
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
            <div id='courses-section' className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8" style={{marginBottom: '15rem'}}>
                <div className="text-center">
                    <h2 className="font-bold text-6xl mt-14">Search Courses</h2>
                    <SearchCourses />
                </div>

                <div className='sm:flex justify-between items-center pb-12' style={{paddingBottom: '1rem'}}>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Fulltime Courses</h2>
                </div>
                
                <div className='flex nowhitespace rounded-xl bg-white p-1 overflow-x-auto' style={{float: 'left', flexDirection: 'column', width: '23%', marginRight: '2%'}}> {/* space-x-5 */}

                    {/* FOR DESKTOP VIEW */}
                    <button onClick={() => setSelectedButton('All Courses')} className={"bg-white " + (selectedButton === 'All Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>All Courses</button>
                    <button onClick={() => setSelectedButton('Beginner Courses')} className={"bg-white " + (selectedButton === 'Beginner Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Beginner Courses</button>
                    <button onClick={() => setSelectedButton('Elementary Courses')} className={"bg-white " + (selectedButton === 'Elementary Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Elementary Courses</button>
                    <button onClick={() => setSelectedButton('Intermediate Courses')} className={"bg-white " + (selectedButton === 'Intermediate Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Intermediate Courses</button>
                    <button onClick={() => setSelectedButton('Upper-intermediate Courses')} className={"bg-white " + (selectedButton === 'Upper-intermediate Courses' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"} style={{textAlign: 'left'}}>Upper-intermediate Courses</button>

                    {/* FOR MOBILE VIEW */}
                    <GlobeAltIcon onClick={() => setSelectedButton('Beginner Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Beginner Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <DevicePhoneMobileIcon onClick={() => setSelectedButton('Elementary Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Elementary Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CircleStackIcon onClick={() => setSelectedButton('Intermediate Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Intermediate Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CloudIcon onClick={() => setSelectedButton('Upper-intermediate Courses')} width={70} height={70} className={"bg-white " + (selectedButton === 'Upper-intermediate Courses' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
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

export default Coursesdialog;




