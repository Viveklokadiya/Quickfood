import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useOrder = () => {
    const axiosPublic = useAxiosPublic();

    const {data: Orders =[], isPending: loading, refetch} = useQuery({
        queryKey: ['Orders'],
        queryFn: async () => {
            const res = await axiosPublic.get('/orders');
            console.log(res.data)
            return res.data;
          },
    })

  return [Orders, loading, refetch]
}

export default useOrder