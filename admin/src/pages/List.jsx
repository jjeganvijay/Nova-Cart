import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <p className='mb-6 text-xl font-semibold'>All Products</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

        {list.map((item, index) => (
          <div key={index} className='relative bg-white/80 backdrop-blur-lg rounded-3xl p-4 shadow-xl flex flex-col gap-3 hover:shadow-2xl transition-all'>

            <img src={item.image[0]} alt={item.name} className='w-full h-40 object-cover rounded-2xl'/>

            <div className='flex flex-col gap-1'>
              <p className='text-lg font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.category}</p>
              <p className='font-bold text-purple-600'>{currency}{item.price}</p>
            </div>

            <button
              onClick={() => removeProduct(item._id)}
              className='absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-red-500 hover:text-white transition-all'
            >
              <Trash2 size={20} />
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}

export default List
