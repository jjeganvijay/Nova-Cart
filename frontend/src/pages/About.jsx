import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>

      <div className='text-3xl text-center pt-12 border-t border-gray-300'>
        <Title text1={'ABOUT'} text2={'NOVA'} />
      </div>

      <div className='mt-12 mb-16 flex flex-col lg:flex-row gap-12 px-4 items-center'>
        <div className='w-full lg:w-[500px] aspect-video rounded-xl shadow-lg overflow-hidden'>
          <img
            src={assets.about_img}
            alt="About NovaCart"
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex flex-col justify-center gap-6 lg:w-3/5 text-gray-700 leading-relaxed'>
          <p><strong>NovaCart</strong> is more than just an online store — it's a curated destination for modern shopping. We started with the vision of redefining how people discover and shop lifestyle essentials in one sleek experience.</p>
          <p>Over time, we’ve built a catalogue filled with premium selections across fashion, home, gadgets, and more — all sourced from verified suppliers and brands you can trust.</p>
          <b className='text-gray-900 text-lg'>Our Purpose</b>
          <p>At NovaCart, we aim to simplify online shopping through design, speed, and trust. From first click to doorstep delivery, we’re here to make shopping effortless and exciting.</p>
        </div>
      </div>

      <div className='text-2xl py-6 px-4'>
        <Title text1={'WHY'} text2={'NOVACART?'} />
      </div>

      <div className='flex flex-col md:flex-row gap-6 mb-24 px-4'>
        <div className='border border-gray-200 px-8 py-10 flex flex-col gap-3 rounded-md shadow-sm bg-white'>
          <b>Top-Notch Quality</b>
          <p className='text-gray-600 text-sm'>Each item is carefully selected and quality-checked to deliver the best experience possible.</p>
        </div>
        <div className='border border-gray-200 px-8 py-10 flex flex-col gap-3 rounded-md shadow-sm bg-white'>
          <b>Effortless Experience</b>
          <p className='text-gray-600 text-sm'>Our clean interface, secure payment, and seamless checkout make shopping stress-free.</p>
        </div>
        <div className='border border-gray-200 px-8 py-10 flex flex-col gap-3 rounded-md shadow-sm bg-white'>
          <b>Customer-First Approach</b>
          <p className='text-gray-600 text-sm'>From live support to post-order updates, your satisfaction is at the core of what we do.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  );
};

export default About;
