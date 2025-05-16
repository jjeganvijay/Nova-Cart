import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'GET IN'} text2={'TOUCH'} />
      </div>

      <div className='my-12 flex flex-col-reverse md:flex-row gap-10 md:items-center px-4 mb-28'>
        <div className='flex flex-col justify-center items-start gap-6 md:w-1/2'>
          <p className='font-semibold text-xl text-gray-700'>Visit Our Office</p>
          <p className='text-gray-600 leading-relaxed'>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className='text-gray-600'>
            Phone: (415) 555-0132 <br />
            Email: support@yourstore.com
          </p>
          <p className='font-semibold text-xl text-gray-700'>Join Our Team</p>
          <p className='text-gray-600'>We're hiring! Discover opportunities to grow with us.</p>
          <button className='border border-black px-6 py-3 text-sm rounded hover:bg-black hover:text-white transition-all duration-300'>
            View Careers
          </button>
        </div>
        <img className='w-full md:max-w-[460px] rounded-lg shadow-md' src={assets.contact_img} alt="contact" />
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
