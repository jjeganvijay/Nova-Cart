import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  const navLinkStyles = ({ isActive }) =>
    `flex flex-col items-center gap-1 hover:text-black ${
      isActive ? 'text-black font-semibold' : 'text-gray-700'
    }`

  return (
    <nav className="flex items-center justify-between py-5 font-medium relative z-20">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="NovaCart Logo" />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-6 text-sm">
        <NavLink to="/" className={navLinkStyles}>
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className={navLinkStyles}>
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to="/about" className={navLinkStyles}>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className={navLinkStyles}>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right-side icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true)
            navigate('/collection')
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            onClick={() => !token && navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          {token && (
            <div className="absolute right-0 pt-3 hidden group-hover:block">
              <div className="bg-white border rounded shadow-lg w-36 py-3 px-5 text-sm text-gray-600">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <span className="absolute right-[-6px] bottom-[-6px] w-4 h-4 bg-black text-white text-[9px] flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-30 bg-white shadow-md transition-all duration-300 ease-in-out ${
          visible ? 'w-3/4' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 border-b cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <span>Back</span>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
