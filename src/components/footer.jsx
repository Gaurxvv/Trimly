import React from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon } from 'lucide-react';

const Footer = () => (
  <footer className="w-full bg-[#18181b] border-t border-[#39394a] h-16 py-4">
    <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center px-2 gap-6">
      {/* Left: Logo and Brand */}
      <div className="flex items-center gap-2 ml-2 md:ml-2 md:mr-auto w-full md:w-auto justify-center md:justify-start">
        <LinkIcon className="h-6 w-6 text-teal-400" />
        <span className="font-bold text-lg text-white">Trimly</span>
      </div>
      {/* Center: Navigation */}
      <nav className="flex gap-6 text-gray-300 text-sm justify-center w-full md:w-auto order-2 md:order-none">
        <Link to="/" className="hover:text-white transition">Terms</Link>
        <Link to="/" className="hover:text-white transition">Privacy</Link>
        <Link to="/" className="hover:text-white transition">Contact</Link>
      </nav>
      {/* Right: Copyright */}
      <div className="text-gray-300 text-sm flex items-center gap-1 mr-2 md:ml-auto w-full md:w-auto justify-center md:justify-end order-3 md:order-none">
        <span className="text-lg">©</span>
        {new Date().getFullYear()} Trimly. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;