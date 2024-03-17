import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useOrder from '../../../hooks/useOrder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { GrView } from "react-icons/gr";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageOrder = () => {
  const [Orders, loading, refetch] = useOrder();
  const axiosSecure = useAxiosSecure();

 
  

  

  const makedone = (id) => {
    axiosSecure.patch(`/orders/done/${id}`).then((res) => {
      // alert(`${id} is now done`);
      Swal.fire("completed!", "Your order has been completed.", "success");
      refetch();
    });
  };

  const makecancel = (id) => {
    axiosSecure.patch(`/orders/cancle/${id}`).then((res) => {
      // alert(`${id} is now cancle`);
      Swal.fire("Cancled!", "Your order has been cancled.", "warning");
      refetch();
    });
  };

  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>NO.</th>
            <th>View</th>
            <th>Name</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody >
        {Orders.map((items, index) => (
          <tr key={index}>
            <td className="flex gap-5">
              {index + 1}
              
              
            </td>
            <td>
            <Link to={`/dashboard/orders/?orderId=${items._id}`}>
              <button className="btn btn-ghost btn-xs bg-orange-500 text-white" > 
            <GrView />
            </button>
            </Link>
            </td>
            <td><div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{items.name}</div>
                <div className="text-sm opacity-50">{items.email}</div>
              </div>
            </div></td>
            <td>{items.fulladress}</td>
            <td>{items.amount}</td>
            <td>{items.OrderStatus}</td>
            <td>
              <button 
              
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                       
                        onClick={()=>makedone(items._id)}
                        
                        >Done
              </button>
              <button  onClick={()=>makecancel(items._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancle
                </button>
            </td>
          </tr>
        ))}
        
          
        </tbody>

      </table>

     
      
    </div>
  );
};

export default ManageOrder;
