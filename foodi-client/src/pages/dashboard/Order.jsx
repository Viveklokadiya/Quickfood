import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';

const Order = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);


  const { user } = useContext(AuthContext);

  
  const  email = user?.email;
  console.log(email);
   

  useEffect(() => {
  


    

    axiosSecure.get(`http://localhost:6001/getorders/${email}`,)
      .then(response => {
        // Check if response status is within the success range (200-299)
        if (response.status >= 200 && response.status < 300) {
          // Data received successfully
          setOrder(response.data); // Assuming response.data contains the order details
          console.log(response.data);
          const orderdata = response.data;
        } else {
          // Handle other status codes (e.g., 404 for not found)
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }, [axiosSecure, setOrder]);


  return (
    <div  className="  max-w-screen-2xl container  xl:px-24 px-4 text-[#000000] text-xl md:w-4/5 mx-auto">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
        <div className="overflow-x-auto">
        <table className="table">
        {/* head */}
        <thead>
          <tr className=" font-semibold mb-6 text-blue-700">
            <th>NO.</th>
            <th>View</th>
            <th>Name</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody >
        {order &&
                  order.map((orderItem,index) => (
          <tr key={index}>
            <td className="flex gap-5">
              {index + 1}
              
              
            </td>
            <td>
            <Link to={`/orders/?orderId=${orderItem._id}`}>
              <button className="btn btn-ghost btn-xs bg-orange-500 text-white" > 
            <GrView />
            </button>
            </Link>
            </td>
            <td><div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{orderItem.name}</div>
                <div className="text-sm opacity-50">{orderItem.email}</div>
              </div>
            </div></td>
            <td>{orderItem.fulladress}</td>
            <td>{orderItem.amount}</td>
            <td>{orderItem.OrderStatus}</td>
            
          </tr>
        ))}
        
          
        </tbody>

      </table>

     
      
    </div>
        </div>
      </div>

      {/* cart table */}
     

    </div>
  )
}

export default Order