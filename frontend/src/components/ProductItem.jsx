import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link 
            onClick={() => scrollTo(0, 0)} 
            to={`/product/${id}`} 
            className='group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
        >
            <div className='overflow-hidden'>
                <img 
                    src={image[0]} 
                    alt="" 
                    className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300' 
                />
            </div>
            <div className='p-4'>
                <p className='text-base font-semibold text-slate-800 truncate'>{name}</p>
                <p className='text-sm text-blue-600 font-medium mt-1'>{currency}{price}</p>
            </div>
        </Link>
    )
}

export default ProductItem
