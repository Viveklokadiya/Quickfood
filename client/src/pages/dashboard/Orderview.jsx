import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Orderview = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null); // Define order state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('orderId');

    axiosSecure.get(`http://localhost:6001/orders/${sessionId}`)
      .then(response => {
        // Check if response status is within the success range (200-299)
        if (response.status >= 200 && response.status < 300) {
          // Data received successfully
          setOrder(response.data); // Assuming response.data contains the order details
          console.log(response.data);
        } else {
          // Handle other status codes (e.g., 404 for not found)
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }, [axiosSecure, setOrder]); // Include axiosSecure and setOrder in the dependency array

  if (!order) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="max mx-auto bg-white shadow-md p-8 rounded-md py-20">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Order Details</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Order ID:</p>
          <p className="text-gray-700">{order.id}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Amount:</p>
          <p className="text-gray-700">₹{order.amount}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Email:</p>
          <p className="text-gray-700">{order.email}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Name:</p>
          <p className="text-gray-700">{order.name}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-800">Full Address:</p>
          <p className="text-gray-700">{order.fulladress}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Ordered Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.lineItems.map((item, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-md">
            <h3 className="text-xl font-bold mb-2 text-blue-800">{item.name}</h3>
            <p className="text-gray-800"><span className="font-semibold">Quantity:</span> {item.quantity}</p>
            <p className="text-gray-800"><span className="font-semibold">Amount:</span> ₹{item.amount /100}</p>
            <p className="text-gray-800"><span className="font-semibold">Total:</span> ₹{(item.amount * item.quantity)/100}</p>
            <img src={item.image[0]} alt={item.name} className="mt-4 rounded-lg" style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
      <p className="mt-8 font-semibold text-blue-800">Order Status: <span className="text-gray-800">{order.OrderStatus}</span></p>
      <div className="flex items-center justify-center gap-5 mt-8">

          <Link to="/"><button className=" items-center btn bg-orangee text-white mt-3 ">Back to Home</button></Link>
          <Link to="/order"><button className=" items-center btn bg-orangee text-white mt-3 ">Back to Orders</button></Link>
      </div>
    </div>
  );
};


export default Orderview;