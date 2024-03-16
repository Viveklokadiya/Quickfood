import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [paymentIntents, setPaymentIntents] = useState([]);

  useEffect(() => {
    const fetchPaymentIntents = async () => {
      const response = await axios.get('/payment-intents');
      setPaymentIntents(response.data);
    };
    fetchPaymentIntents();
  }, []);

  return (
    <div>
      <h1>Payment Intents</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {paymentIntents.map(intent => (
            <tr key={intent.id}>
              <td>{intent.id}</td>
              <td>{intent.status}</td>
              <td>{(intent.amount / 100).toFixed(2)}</td> 
              <td>{intent.currency}</td>
              <td>{intent.productDetails ? intent.productDetails.id : '-'}</td>
              <td>{intent.productDetails ? intent.productDetails.name : '-'}</td>
              <td>{intent.itemQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
