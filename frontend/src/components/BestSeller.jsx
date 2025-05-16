import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { ImSpinner2 } from 'react-icons/im' // Spinner icon

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      const bestProduct = products.filter((item) => item.bestseller)
      setBestSeller(bestProduct.slice(0, 5))
      setLoading(false)
    }, 500) // simulate delay

    return () => clearTimeout(timeout)
  }, [products])

  return (
    <section className="my-16">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <Title text1="Top" text2="Picks" />
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-500 tracking-wide leading-relaxed mt-2">
          Explore our handpicked best-selling products that customers love the most.
        </p>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ImSpinner2 className="animate-spin text-3xl text-indigo-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 px-2 sm:px-4">
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default BestSeller
