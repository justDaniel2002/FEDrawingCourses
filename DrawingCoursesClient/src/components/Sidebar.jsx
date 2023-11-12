import React from 'react';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag, HiTemplate } from 'react-icons/hi';
import { SiCoursera } from 'react-icons/si'
import { FiSettings } from 'react-icons/fi';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link to='/admin'>
            <div className='bg-purple-800 text-white p-3 rounded-lg inline-block'>
              <RxSketchLogo size={30} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <Link to='/admin'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxDashboard size={30} />
            </div>
          </Link>
          <Link to='/admin/customers'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <RxPerson size={30} />
            </div>
          </Link>
          <Link to='/admin/orders'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block text-center'>
              <HiOutlineShoppingBag size={30} />
            </div>
          </Link>
          <Link to='/admin/orderTool'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block text-center'>
              <WorkOutlineIcon size={30} />
            </div>
          </Link>
          <Link to='/admin/items'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block text-center'>
              <HiTemplate size={30} />
            </div>
          </Link>
          <Link to='/admin/courses'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block text-center'>
              <SiCoursera size={30} />
            </div>
          </Link>
          
          {/* <Link to='/admin'>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <FiSettings size={20} />
            </div>
          </Link> */}
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
