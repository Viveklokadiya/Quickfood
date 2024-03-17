import React from 'react'
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Order = () => {


  const { user } = useAuth();
    console.log(user?.email)
    const token = localStorage.getItem('access-token')

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/orders/email/?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
    })

    console.log(orders);


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track Your All<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart table */}
     

    </div>
  )
}

export default Order