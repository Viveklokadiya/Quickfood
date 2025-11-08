import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'http://3.109.200.232:6001',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  