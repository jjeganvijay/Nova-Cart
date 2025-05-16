import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Forever Store',
      description: 'Secure Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed.");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const codRes = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (codRes.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(codRes.data.message);
          }
          break;

        case 'stripe':
          const stripeRes = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (stripeRes.data.success) {
            window.location.replace(stripeRes.data.session_url);
          } else {
            toast.error(stripeRes.data.message);
          }
          break;

        case 'razorpay':
          const razorRes = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (razorRes.data.success) {
            initPay(razorRes.data.order);
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order.");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-16 border-t min-h-[85vh]'>

      {/* --------- Delivery Info ----------- */}
      <div className='flex flex-col gap-5 w-full sm:max-w-[500px]'>
        <div className='text-xl sm:text-2xl mb-2'>
          <Title text1={'SHIPPING'} text2={'DETAILS'} />
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} className='form-input' type="text" placeholder='First Name' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} className='form-input' type="text" placeholder='Last Name' />
        </div>

        <input required name='email' value={formData.email} onChange={onChangeHandler} className='form-input' type="email" placeholder='Email Address' />
        <input required name='street' value={formData.street} onChange={onChangeHandler} className='form-input' type="text" placeholder='Street Address' />

        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler} className='form-input' type="text" placeholder='City' />
          <input name='state' value={formData.state} onChange={onChangeHandler} className='form-input' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} className='form-input' type="number" placeholder='Postal Code' />
          <input required name='country' value={formData.country} onChange={onChangeHandler} className='form-input' type="text" placeholder='Country' />
        </div>

        <input required name='phone' value={formData.phone} onChange={onChangeHandler} className='form-input' type="number" placeholder='Phone Number' />
      </div>

      {/* ---------- Cart & Payment --------- */}
      <div className='mt-10 sm:mt-0'>

        <div className='mb-12'>
          <CartTotal />
        </div>

        <div>
          <Title text1={'CHOOSE'} text2={'PAYMENT'} />
          <div className='flex flex-col lg:flex-row gap-4 mt-3'>

            <div onClick={() => setMethod('stripe')} className='pay-method'>
              <span className={`radio-btn ${method === 'stripe' ? 'bg-green-400' : ''}`}></span>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe" />
            </div>

            <div onClick={() => setMethod('razorpay')} className='pay-method'>
              <span className={`radio-btn ${method === 'razorpay' ? 'bg-green-400' : ''}`}></span>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="razorpay" />
            </div>

            <div onClick={() => setMethod('cod')} className='pay-method'>
              <span className={`radio-btn ${method === 'cod' ? 'bg-green-400' : ''}`}></span>
              <p className='text-gray-600 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>

          </div>

          <div className='text-right mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm tracking-wide hover:opacity-90 transition'>
              CONFIRM ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles (Tailwind extensions) */}
      <style jsx>{`
        .form-input {
          @apply border border-gray-300 rounded py-1.5 px-3.5 w-full;
        }
        .pay-method {
          @apply flex items-center gap-3 border p-2 px-3 rounded cursor-pointer hover:shadow-sm transition;
        }
        .radio-btn {
          @apply min-w-3.5 h-3.5 border rounded-full;
        }
      `}</style>
    </form>
  )
}

export default PlaceOrder
