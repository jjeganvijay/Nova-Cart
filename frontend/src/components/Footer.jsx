import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white text-sm text-gray-600 mt-40">
      {/* Grid Section */}
      <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr] py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

        {/* Logo & Description */}
        <div>
          <img src={assets.logo} alt="NovaCart Logo" className="w-36 mb-4" />
          <p className="max-w-md leading-relaxed">
            NovaCart is your go-to destination for curated collections, trendsetting styles, and seamless shopping experiences. Quality meets convenience, every time.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-black transition">Home</a></li>
            <li><a href="/about" className="hover:text-black transition">About Us</a></li>
            <li><a href="/collection" className="hover:text-black transition">Shop</a></li>
            <li><a href="/privacy" className="hover:text-black transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <ul className="space-y-2">
            <li>📞 +1 (212) 456-7890</li>
            <li>📧 support@novacart.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © 2024 NovaCart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
