import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className='bg-gradient-to-br from-blue-50 to-white py-10 px-6 rounded-xl shadow-md text-center'>
            <p className='text-3xl font-semibold text-blue-900 tracking-wide'>Join & Enjoy 20% OFF</p>
            <p className='text-sm text-blue-600 mt-2'>
                Be the first to hear about exclusive deals, latest trends & new arrivals.
            </p>
            <form onSubmit={onSubmitHandler} className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-4'>
                <input 
                    className='w-full sm:w-1/2 px-4 py-3 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all' 
                    type="email" 
                    placeholder='Your email address' 
                    required 
                />
                <button 
                    type='submit' 
                    className='bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm px-6 py-3 rounded-md transition-colors'
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    )
}

export default NewsletterBox
