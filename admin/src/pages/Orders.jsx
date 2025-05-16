import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      <h3 className='text-2xl font-bold mb-6'>All Orders</h3>

      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <svg className='animate-spin h-6 w-6 text-gray-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
          </svg>
        </div>
      ) : (
        <div className='flex flex-col gap-6'>
          {orders.map((order, index) => (
            <div
              key={index}
              className='relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center gap-4'
            >
              <img src={assets.parcel_icon} alt='Parcel' className='w-14 h-14 object-contain' />

              <div className='flex-1'>
                <div className='mb-4'>
                  {order.items.map((item, i) => (
                    <p key={i} className='text-sm text-gray-700'>
                      {item.name} x {item.quantity}{' '}
                      <span className='text-gray-500'>({item.size})</span>
                      {i !== order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <div className='text-sm text-gray-600'>
                  <p className='font-semibold'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city}
                  </p>
                  <p>
                    {order.address.state}, {order.address.country},{' '}
                    {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div className='flex flex-col text-sm text-gray-700'>
                <p>
                  Items: <span className='font-medium'>{order.items.length}</span>
                </p>
                <p>
                  Method: <span className='font-medium'>{order.paymentMethod}</span>
                </p>
                <p>
                  Payment:{' '}
                  <span className={`font-bold ${order.payment ? 'text-green-600' : 'text-red-500'}`}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>
                <p>
                  Date: <span>{new Date(order.date).toLocaleDateString()}</span>
                </p>
              </div>

              <div className='flex flex-col gap-2 min-w-[120px]'>
                <p className='text-xl font-bold text-purple-600'>
                  {currency}
                  {order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className='px-3 py-2 rounded-xl bg-gray-100 font-medium hover:bg-gray-200'
                >
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivery'>Out for delivery</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
