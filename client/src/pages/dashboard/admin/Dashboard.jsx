import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useOrder from '../../../hooks/useOrder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { GrView } from "react-icons/gr";

const Dashboard = () => {
  const [Orders, loading, refetch] = useOrder();
  const axiosSecure = useAxiosSecure();




  return (
   <div>
    </div>
  );
};

export default Dashboard;
