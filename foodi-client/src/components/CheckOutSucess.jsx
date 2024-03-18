import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios for making HTTP requests
import { Link } from 'react-router-dom';


const CheckOutSucess = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Extracting session ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          throw new Error('Session ID not found');
        }

        // Fetching order data from Stripe
        const response = await axios.get(`http://localhost:6001/SuccessfulPayment/api/stripe/order?session_id=${sessionId}`); // Replace '/api/stripe/order' with your backend endpoint for fetching order data
        setOrderData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  console.log('Order Data: ', orderData);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderData) {
    return <div>No order data found</div>;
  }

  return (
  //   <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
  //     <div className="py-24  flex-col md:flex-row-reverse items-center justify-between gap-8">
  //     <h1>Order Details</h1>
  //     <p>Order ID: {orderData.id}</p>
  //     <p>Amount: {orderData.amount}</p>
  //     {/* <p>Currency: {orderData.currency}</p>
  //     <p>Status: {orderData.status}</p> */}
  //     <p>Email: {orderData.email}</p>
  //     <p>User ID: {orderData.id}</p>
  //     <p>User Name: {orderData.name}</p>
  //     <p>User Phone: {orderData.phone}</p>
  //     <p>User Address: {orderData.fulladress}</p>
  //     <p>User status: {orderData.OrderStatus}</p>
     
  //     <div className="flex gap-3 mt-6 ">
  //     {orderData.lineItems.map((item) => (
  //       <li key={item.idd} className="felx  flex-row md:flex-row-reverse items-center justify-between gap-8">
  //         <h3>{item.name}</h3>
  //         <p>Quantity: {item.quantity}</p>
  //         <p>Amount: ${item.amount / 100}</p> {/* assuming amount is in cents */}
  //         <img src={item.image[0]} alt={item.name} style={{ maxWidth: '200px' }} />
  //       </li>
  //     ))}
  //   </div>
     
     


      
        
       
        
  // </div>
    
    
    
  //   </div>

  <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    
    <h1 className="text-3xl font-bold mb-6 text-blue-700">Order Details</h1>
    <div className="flex flex-col space-y-4"> 
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">Order ID:</p>
        <p className="text-gray-700">{orderData.id}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">Amount:</p>
        <p className="text-gray-700">₹{orderData.amount}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">Email:</p>
        <p className="text-gray-700">{orderData.email}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">Name:</p>
        <p className="text-gray-700">{orderData.name}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">Full Address:</p>
        <p className="text-gray-700">{orderData.fulladress}</p>
      </div>
    </div>
    <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Ordered Items</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orderData.lineItems.map((item, index) => (
        <div key={index} className="bg-gray-100 p-6 rounded-md">
          <h3 className="text-xl font-bold mb-2 text-blue-800">{item.name}</h3>
          <p className="text-gray-800"><span className="font-semibold">Quantity:</span> {item.quantity}</p>
          <p className="text-gray-800"><span className="font-semibold">Amount:</span> ₹{item.amount}</p>
          <img src={item.image[0]} alt={item.name} className="mt-4 rounded-lg" style={{ maxWidth: '100%' }} />
        </div>
      ))}
    </div>
    <p className="mt-8 font-semibold text-blue-800">Order Status: <span className="text-gray-800">{orderData.OrderStatus}</span></p>

    <div className="flex items-center justify-center gap-5">

      <Link to="/"><button className=" items-center btn bg-green text-white mt-3 ">Back to Home</button></Link>
      <Link to="/order"><button className=" items-center btn bg-green text-white mt-3 ">Back to Orders</button></Link>
      </div>
    </div>
  </div>
        </div>
      

      {/* cart table */}
     

    </div>





    
  );
};

export default CheckOutSucess;












// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom
// import axios from 'axios';

// function CheckOutSucess() {
//   const [redirectTimeout, setRedirectTimeout] = useState(5); // Redirect after 5 seconds
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/'); // Redirect to home page
//     }, redirectTimeout * 3000);

//     return () => clearTimeout(timer);
//   }, [redirectTimeout, navigate]);


 

//   // axios.post(`http://localhost:6001/ResetCart`).then((res) => {
//   //     if(res.data.url){
//   //       window.location.href= res.data.url;
//   //       console.log(res);
//   //     }else{
//   //       alert('Please login first');}
//   //     console.log(res);
//   //   }).catch((err) => console.log(err));

//   axios.get(`http://localhost:6001/db`)

  

//   return (


//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28 flex flex-col items-center justify-center">
//       <div className="checkout-success">
//         <h1 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">Payment Successful!</h1>
//         <p className="text-[#4A4A4A] text-xl">Thank you for your order. You will be redirected to the home page in {redirectTimeout} seconds.</p>
//         {/* Optionally include an order summary here */}
//         <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full" onClick={() => navigate('/')}>Go to Home</button>
//       </div>

//     </div>

//   );
// }

// export default CheckOutSucess;
