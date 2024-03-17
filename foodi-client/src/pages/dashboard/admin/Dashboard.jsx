import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useOrder from '../../../hooks/useOrder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { GrView } from "react-icons/gr";

const Dashboard = () => {
  const [Orders, loading, refetch] = useOrder();
  const axiosSecure = useAxiosSecure();




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
            <th>amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody >
        {Orders.map((items, index) => (
          <tr key={index}>
            <td className="flex gap-5">
              {index + 1}
              
              
            </td>
            <td><button > <GrView /></button>
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
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Done</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancle</button>
            </td>
          </tr>
        ))}
        
          
        </tbody>

      </table>

     
    </div>
  );
};

export default Dashboard;
