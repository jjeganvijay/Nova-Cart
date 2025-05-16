import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { ImSpinner2 } from 'react-icons/im' // Spinner icon

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const [loading, setLoading] = useState(true) // loading state

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      const sortedByLatest = [...products].reverse().slice(0, 10)
      setLatestProducts(sortedByLatest)
      setLoading(false)
    }, 500) // Simulate slight delay

    return () => clearTimeout(timeout)
  }, [products])

  return (
    <section className="my-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-11/12 sm:w-3/4 lg:w-1/2 mx-auto text-gray-600 text-xs sm:text-sm md:text-base">
          Explore our most recent additions, thoughtfully curated to match today’s style and trends.
        </p>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ImSpinner2 className="animate-spin text-3xl text-purple-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default LatestCollection
