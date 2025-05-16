import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className="w-full sm:w-[220px] min-h-screen border-r border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 pt-10 px-6">
        {/* Menu Item */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add icon" />
          <span className="hidden md:block">Add Items</span>
        </NavLink>

        {/* Menu Item */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List icon" />
          <span className="hidden md:block">List Items</span>
        </NavLink>

        {/* Menu Item */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders icon" />
          <span className="hidden md:block">Orders</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
