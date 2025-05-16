import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="w-full bg-white p-5 shadow-md rounded-xl border border-gray-100">
      {/* Section Title */}
      <div className="text-xl font-semibold mb-4">
        <Title text1="Order" text2="Summary" />
      </div>

      {/* Pricing Details */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency} {subtotal}.00</span>
        </div>
        <div className="border-t" />
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{currency} {delivery_fee}.00</span>
        </div>
        <div className="border-t" />
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>{currency} {total}.00</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
