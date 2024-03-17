
import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Vieworder = () => {

  const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

  // const urlParams = new URLSearchParams(window.location.search);
  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     try {
  //       // Extracting session ID from the URL
        // const urlParams = new URLSearchParams(window.location.search);
        // const sessionId = urlParams.get('orderId');

  //       if (!sessionId) {
  //         throw new Error('Session ID not found');
  //       }

  //       // Fetching order data from Stripe
  //       const response = await axios.get(`http://localhost:6001/orders/${idd}`); // Replace '/api/stripe/order' with your backend endpoint for fetching order data
  //       setOrderData(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchOrderData();
  // }, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('orderId');
    console.log("URL Params: ",urlParams);
    fetch(`http://localhost:6001/orders/${idd}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrder(data);
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }, []);

  

  // const order = (id) =>{
  //   const res = axiosPublic.get(`http://localhost:6001/orders/${idd}`).then((res) => {
  //     console.log(res.data);
  //   });
  // };



  return (
    <div>
      <h1>View Order</h1>
      <button onClick={() => order(idd)}>View Order</button>
      <p>{res.data.id}</p>
    </div>
  )
}

export default Vieworder