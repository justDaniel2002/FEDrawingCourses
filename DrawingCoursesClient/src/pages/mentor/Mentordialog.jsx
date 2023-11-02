// MENTORS DATA

import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";



const products = [
    {
        id: 1,
        name: 'Senior Artist',
        href: '#',
        imageSrc: '/assets/mentor/boy1.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Shoo Thar Mein',
    },
    {
        id: 2,
        name: 'Mosaic Instructor',
        href: '#',
        imageSrc: '/assets/mentor/boy2.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Cristian Doru Barin',
    },
    {
        id: 3,
        name: 'Traditional painter',
        href: '#',
        imageSrc: '/assets/mentor/boy3.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Tanzeel Ur Rehman',
    },
    {
        id: 4,
        name: 'Wall painter',
        href: '#',
        imageSrc: '/assets/mentor/boy4.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Andrew Williams',
    },
    {
        id: 5,
        name: 'Realist painter',
        href: '#',
        imageSrc: '/assets/mentor/boy5.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Brad Schiff',
    },
    {
        id: 6,
        name: 'Post-Impressionist painter',
        href: '#',
        imageSrc: '/assets/mentor/girl1.svg',
        imageAlt: "Front of men's Basic Tee in black.",
        color: 'Daniel Walter Scott',
    },
]

const Mentor = () => {
    const [mentors, SetMentors] = useState([])

    useEffect(() => {
        const callback = async () => {
            const getMentors = await api.getAllInstructor()
            SetMentors(getMentors)
            console.log(getMentors)
        }
        callback()
    },[])
    return (
                                               //mx-auto max-w-2xl pb-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8 
            <div id="mentors-section" className="mx-auto max-w-2xl pb-16 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8" style={{marginBottom: '17rem'}}>

                <div className='sm:flex justify-between items-center mb-12'>
                    <h2 className=" d-flex justify-content-center text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4"> All Mentors</h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {mentors.map((product) => (
                        <div key={`/Mentor/${product.username}`} className="group relative">
                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                <img
                                    src={product.img}
                                    alt={product.img}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-center ">
                                <div>
                                    <div className='border border-white rounded-lg -mt-8 bg-white p-2 mentorShadow'>
                                        <h3 className="text-sm text-gray-700 text-center">
                                            <Link to={`/Mentor/${product.username}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.userRole}
                                            </Link>
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-2xl font-semibold text-offblack text-center">{product.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Mentor;
