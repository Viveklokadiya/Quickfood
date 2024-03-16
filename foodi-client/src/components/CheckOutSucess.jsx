import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom

function CheckOutSucess() {
  const [redirectTimeout, setRedirectTimeout] = useState(5); // Redirect after 5 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home page
    }, redirectTimeout * 3000);

    return () => clearTimeout(timer);
  }, [redirectTimeout, navigate]);

  // axios.post(`http://localhost:6001/ResetCart`).then((res) => {
  //     if(res.data.url){
  //       window.location.href= res.data.url;
  //       console.log(res);
  //     }else{
  //       alert('Please login first');}
  //     console.log(res);
  //   }).catch((err) => console.log(err));

  

  return (


    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28 flex flex-col items-center justify-center">
      <div className="checkout-success">
        <h1 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">Payment Successful!</h1>
        <p className="text-[#4A4A4A] text-xl">Thank you for your order. You will be redirected to the home page in {redirectTimeout} seconds.</p>
        {/* Optionally include an order summary here */}
        <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full" onClick={() => navigate('/')}>Go to Home</button>
      </div>

    </div>

  );
}

export default CheckOutSucess;
