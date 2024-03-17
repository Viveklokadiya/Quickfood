import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios for making HTTP requests

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
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderData.id}</p>
      <p>Amount: {orderData.amount}</p>
      <p>Currency: {orderData.currency}</p>
      {/* Display other order details as needed */}
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
