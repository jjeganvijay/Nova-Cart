import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div className='bg-white border-y py-6'>
            <div className='flex justify-center items-center gap-3 px-4 sm:px-6'>
                <div className='flex items-center w-full sm:w-2/3 md:w-1/2 bg-slate-100 border border-slate-300 rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 transition'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search products..."
                        className='flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none'
                    />
                    <img src={assets.search_icon} alt="" className='w-5 opacity-70' />
                </div>
                <img
                    onClick={() => setShowSearch(false)}
                    src={assets.cross_icon}
                    alt=""
                    className='w-4 cursor-pointer hover:opacity-70 transition'
                />
            </div>
        </div>
    ) : null
}

export default SearchBar
