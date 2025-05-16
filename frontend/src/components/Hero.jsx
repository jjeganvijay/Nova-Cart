import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className="flex flex-col-reverse sm:flex-row items-center border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Hero Text Section */}
      <div className="w-full sm:w-1/2 px-6 py-12 sm:px-10 md:px-14 lg:px-20 text-[#2c2c2c] bg-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-[2px] bg-[#2c2c2c]"></span>
          <span className="uppercase text-xs font-medium tracking-wider">NovaCart Picks</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight mb-4">
          Discover Our Latest Arrivals
        </h1>

        <div className="flex items-center gap-3 group cursor-pointer w-fit">
          <span className="font-semibold text-sm sm:text-base transition group-hover:underline">Shop Now</span>
          <span className="w-8 sm:w-10 h-[1px] bg-[#2c2c2c] transition-all group-hover:w-12"></span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full sm:w-1/2 max-h-[500px] overflow-hidden rounded-r-xl">
        <img
          src={assets.hero_img}
          alt="Hero showcase"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </section>
  )
}

export default Hero
