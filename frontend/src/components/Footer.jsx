import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8 md:px-10">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">

          <div>
            <h2 className="text-xl font-bold text-indigo-600 mb-2">BookMyDoc</h2>
            <p className="text-gray-500">Easy & trusted doctor appointments</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-indigo-600">Home</a></li>
              <li><a href="/about" className="hover:text-indigo-600">About us</a></li>
              <li><a href="/contact" className="hover:text-indigo-600">Contact us</a></li>
              <li><a href="/privacy" className="hover:text-indigo-600">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Contact</h3>
            <div className="space-y-2">
              <p>+91 484 123 4567</p>
              <p>support@bookmydoc.in</p>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} BookMyDoc. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;