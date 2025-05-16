import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);
  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl mb-8'>
        <Title text1={'ORDER'} text2={'HISTORY'} />
      </div>

      <div className='space-y-6'>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-5 border rounded-lg px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-gray-50 hover:shadow-md transition'>
              <div className='flex items-start gap-5 text-sm'>
                <img className='w-20 rounded' src={item.image[0]} alt="product" />
                <div>
                  <p className='text-base font-semibold'>{item.name}</p>
                  <div className='flex flex-wrap gap-4 mt-1 text-sm text-gray-600'>
                    <p>{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1 text-sm'>Ordered On: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='text-sm'>Payment Mode: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-600'></span>
                  <span className='text-sm'>{item.status}</span>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
