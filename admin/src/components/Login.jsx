import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <div className='bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-10 py-8 max-w-sm w-full'>
            <h1 className='text-3xl font-extrabold text-gray-900 mb-6 text-center'>NovaCart Admin</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-5'>
                    <label className='block text-sm font-semibold text-gray-600 mb-2'>Email Address</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-lg w-full px-4 py-2 border border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-100' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-5'>
                    <label className='block text-sm font-semibold text-gray-600 mb-2'>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-lg w-full px-4 py-2 border border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-100' type="password" placeholder='Enter your password' required />
                </div>
                <button className='mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-300' type="submit">
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
