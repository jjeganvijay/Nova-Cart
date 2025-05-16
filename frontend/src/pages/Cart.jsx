import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-6 text-center'>
        <Title text1={'Your'} text2={'Shopping Cart'} />
      </div>

      <div className='space-y-4'>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                key={index}
                className='py-4 px-2 sm:px-4 rounded-lg border shadow-sm bg-white grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 hover:shadow-md transition-shadow duration-200'
              >
                <div className='flex items-start gap-4 sm:gap-6'>
                  <img
                    className='w-16 sm:w-20 object-cover rounded-md'
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div className='space-y-2'>
                    <p className='text-sm sm:text-lg font-semibold text-gray-800'>{productData.name}</p>
                    <div className='flex items-center gap-4'>
                      <p className='text-gray-700 font-medium'>{currency}{productData.price}</p>
                      <span className='px-3 py-1 border rounded-md bg-gray-50 text-sm'>{item.size}</span>
                    </div>
                  </div>
                </div>

                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className='border rounded px-2 py-1 w-full max-w-[60px] text-center'
                  type='number'
                  min={1}
                  defaultValue={item.quantity}
                />

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-5 sm:w-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity'
                  src={assets.bin_icon}
                  alt='Remove Item'
                  title='Remove Item'
                />
              </div>
            );
          })
        }
      </div>

      <div className='flex justify-end mt-14'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black hover:bg-gray-900 text-white text-sm my-8 px-8 py-3 rounded transition-colors duration-200'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
