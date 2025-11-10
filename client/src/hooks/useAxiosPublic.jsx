import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'http://api.quickfood.viveklokadiya.live',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  