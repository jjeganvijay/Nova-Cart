import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Navbar */}
          <div className='sticky top-0 z-50 shadow-md bg-white'>
            <Navbar setToken={setToken} />
          </div>

          {/* Layout */}
          <div className='flex w-full pt-4'>

            {/* Sidebar */}
            <div className='hidden md:block w-[250px] bg-white shadow-lg rounded-r-3xl p-4'>
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className='flex-1 mx-auto max-w-5xl px-6 py-8'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>

          </div>
        </>
      )}
    </div>
  )
}

export default App
