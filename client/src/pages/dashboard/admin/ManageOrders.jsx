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
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const makedone = (id) => {
    axiosSecure.patch(`/orders/done/${id}`).then((res) => {
      Swal.fire("completed!", "Your order has been completed.", "success");
      refetch();
    });
  };

  const makecancel = (id) => {
    axiosSecure.patch(`/orders/cancel/${id}`).then((res) => {
      Swal.fire("Canceled!", "Your order has been canceled.", "warning");
      refetch();
    });
  };

  const filterOrdersByStatus = (status) => {
    return Orders.filter(order => order.OrderStatus === status);
  };

  const renderOrders = () => {
    const filteredOrders = filterOrdersByStatus(selectedStatus);
    return (
      <div className="max-w-full overflow-x-auto ">
        <h2 className="text-xl font-bold mb-2">{selectedStatus} Orders</h2>
        <table className="table max-w-full">
          {/* Table head */}
          <thead>
            <tr>
              <th>NO.</th>
              <th>View</th>
              <th>Name</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/dashboard/orders/?orderId=${order._id}`}>
                    <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                      <GrView />
                    </button>
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{order.name}</div>
                      <div className="text-sm opacity-50">{order.email}</div>
                    </div>
                  </div>
                </td>
                <td>{order.fulladress}</td>
                <td>{order.amount}</td>
                <td>{order.OrderStatus}</td>
                <td>
                  {selectedStatus === 'Pending' && (
                    <>
                      <button
                        className="bg-orange-500 hover:bg-orangee-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => makedone(order._id)}
                      >
                        Done
                      </button>
                      <button
                        onClick={() => makecancel(order._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-4 ">
        <button
          className={` btn ${selectedStatus === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedStatus('Pending')}
        >
          Pending
        </button>
        <button
          className={`btn ${selectedStatus === 'Completed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedStatus('Completed')}
        >
          Completed
        </button>
        <button
          className={`btn ${selectedStatus === 'Canceled' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedStatus('Canceled')}
        >
          Canceled
        </button>
      </div>
      {renderOrders()}
    </div>
  );
};

export default ManageOrder;
