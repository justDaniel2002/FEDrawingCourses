import React, { useEffect, useState } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../../data/data.js';
import { api } from '../../api/api.js';
import { useRecoilValue } from 'recoil';
import { accountState } from '../../atom/accountState.js';

const Customers = () => {
  window.scrollTo(0, 0);
  const account = useRecoilValue(accountState)
  const [Customers, setCustomers] = useState([])

  const callback = async() => {
    const getCus = await api.getAllUser(account.token)
    setCustomers(getCus)
  }

  useEffect(() => {
    callback()
  },[])

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Name</span>
            <span className='sm:text-left text-right'>Email</span>
            <span className='hidden sm:grid'>Address</span>
            <span className='hidden sm:grid'>Role</span>
          </div>
          <ul>
            {Customers.map((cus, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
                        <div className='bg-purple-100 p-3 rounded-lg'>
                            <BsPersonFill className='text-purple-800' />
                        </div>
                        <p className='pl-4'>{cus.name}</p>
                    </div>
                    <p className='text-gray-600 sm:text-left text-right'>{cus.username}</p>
                    <p className='hidden md:flex'>{cus.address}</p>
                    <p className='hidden md:flex'>{cus.userRole}</p>
                    {/* <div className='sm:flex hidden justify-between items-center'>
                        <p>{order.method}</p>
                        <BsThreeDotsVertical />
                    </div> */}
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Customers;
