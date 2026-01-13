import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* Footer (simple) */}
      <footer className="bg-brand-black text-white pt-20 pb-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              BECOME A PART OF THE PACK
            </h2>
            <p className="text-gray-400 mb-8">
              Get 10% off your first order when you sign up for our newsletter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-white"
              />
              <button className="w-full sm:w-auto bg-white text-black px-8 py-3 font-bold tracking-widest hover:bg-gray-200 transition">
                JOIN PACKVIP
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800 pb-12 mb-12 text-center">
            <div className="flex flex-col items-center">
              <i className="fas fa-star text-2xl mb-3 text-yellow-500"></i>
              <h4 className="font-bold mb-1">5 STAR SERVICE</h4>
              <p className="text-sm text-gray-500">
                Rated excellent by our customers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-shipping-fast text-2xl mb-3 text-green-500"></i>
              <h4 className="font-bold mb-1">FAST DELIVERY</h4>
              <p className="text-sm text-gray-500">
                Shipping worldwide with DHL
              </p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-undo text-2xl mb-3 text-blue-500"></i>
              <h4 className="font-bold mb-1">EFFORTLESS RETURNS</h4>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="font-bold mb-4">SHOP NOW</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">SUPPORT</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Centre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">RESOURCES</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Athletes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Store Locator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">SOCIAL</h5>
              <div className="flex space-x-4 text-xl">
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="mt-6">
                <h5 className="font-bold mb-2">DOWNLOAD OUR APP</h5>
                <div className="bg-white p-1 w-24 h-24 flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://squatwolf.com"
                    alt="App QR"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 text-xs space-y-3">
            <div>
              <a 
                href="/admin/login" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <i className="fas fa-lock"></i>
                Admin Login
              </a>
            </div>
            <div>
              &copy; 2023 SquatWolf Clone. Built for Demo Purposes.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
