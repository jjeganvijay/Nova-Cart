import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t pt-10 transition-all duration-700 ease-in-out'>
      {/* Product Main Section */}
      <div className='flex flex-col lg:flex-row gap-10'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse lg:flex-row gap-4'>
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-3 lg:w-[20%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] lg:w-full cursor-pointer border hover:shadow-lg rounded-md' alt="" />
              ))
            }
          </div>
          <div className='w-full lg:w-[80%]'>
            <img className='w-full h-auto rounded-lg border' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold mb-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mb-4'>
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-2 text-gray-500'>(122 reviews)</p>
          </div>
          <p className='text-4xl font-bold text-blue-600 mb-4'>{currency}{productData.price}</p>
          <p className='text-gray-600 mb-6'>{productData.description}</p>
          <div className='mb-6'>
            <p className='font-medium mb-2'>Select Size:</p>
            <div className='flex gap-3 flex-wrap'>
              {
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`px-4 py-2 border rounded-full hover:bg-blue-100 transition-all duration-300 ${item === size ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105'>
            Add to Cart
          </button>
          <hr className='my-8' />
          <div className='text-gray-500 text-sm space-y-1'>
            <p>✅ 100% Genuine Product Guarantee</p>
            <p>🚚 Cash on Delivery Available</p>
            <p>🔁 Easy Return Policy within 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-16'>
        <div className='flex border-b text-sm font-medium'>
          <button className='px-6 py-3 bg-gray-100'>Description</button>
          <button className='px-6 py-3'>Reviews (122)</button>
        </div>
        <div className='px-6 py-6 text-sm text-gray-600 bg-gray-50 rounded-b-md'>
          <p className='mb-3'>NovaCart is your go-to destination for premium online shopping experiences. From fashion to tech, we bring the best of online retail with seamless convenience.</p>
          <p>We offer dynamic product galleries, smart filtering, and responsive design that adapts perfectly to every device — making NovaCart your ideal digital marketplace.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
}

export default Product;
