import React from 'react'
import { ArrowRight } from 'lucide-react'

function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-wrap pt-5 bg-red-100 p-10 justify-around items-center">
          <div className="min-w-2xs">
                <h1 className='text-5xl leading-16 font-bold'>Give Your Look a New Style.</h1>
                <p className='text-xl font-semibold text-blue-950'>Either walk like you're the king or walk like you don't care who the king is.</p>
                <button className='border-amber-800 bg-orange-500 text-white rounded-4xl px-1 font-semibold m-3 pl-2 hover:bg-blue-400'><a href="/" className="flex items-center ">Explore <ArrowRight className='w-6 h-5'/></a></button>
          </div>
          <div className="min-w-2xs">
                <img src="/photo/converse.png" alt="" className='h-auto w-2xl p-10'/>
          </div>
      </div>
    <div className="bg-blue-100 py-10 px-4">
        <h2 className="text-center font-bold text-3xl mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/black leather boot.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Black Leather Boot</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/red.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Red Sport</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/white addidas.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>White sneaker</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/cream converse.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Cream Converse</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/black leather boot.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Black Leather Boot</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/red.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Red Sport</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/white addidas.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>White sneaker</h4>
          </div>
          <div className="bg-white p-5 rounded-lg hover:scale-105 transition-transform duration-300 text-center">
            <img src="/photo/cream converse.jpg" alt="" className='w-full h-48 object-cover mb-4 rounded'/>
            <h4 className='font-semibold'>Cream Converse</h4>
          </div>
        </div>
      </div>
      <div className="offer">
        <div className="small-container">
            <div className="row">
                <div className="col-2">
                    <img src="Photo/air jordan.jpg" className="offer-img"/>
                </div>
                <div className="col-2">
                    <p>Exclusively Available on New Look</p>
                    <h1>Air Jordan</h1>
                    <small>Air Jordan is a line of basketball shoes produced by Nike, Inc. Related apparel and accessories are marketed under Jordan Brand. The first Air Jordan shoe was produced for basketball player Michael Jordan during his time with the Chicago Bulls in late 1984 and released to the public on April 1, 1985.</small>
                    <br/><a href="products.php" className="btn">Buy Now &#8594</a>
                </div>
            </div>
        </div>
    </div>
      <div className="brands">
        <div className="small-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            <div className="bg-blue-200 p-5 rounded-lg hover:scale-105 transition-transform duration-300 items-center">
              <img src="/logo/adidas logo.png" alt="adidas"/>
            </div>
            <div className="bg-blue-200 p-5 rounded-lg hover:scale-105 transition-transform duration-300 items-center">
              <img src="/logo/nike logo.png" alt="nike"/>
            </div>
            <div className="bg-blue-200 p-5 rounded-lg hover:scale-105 transition-transform duration-300 items-center">
              <img src="/logo/converse logo.png" alt="adidas"/>
            </div>
            <div className="bg-blue-200 p-5 rounded-lg hover:scale-105 transition-transform duration-300 items-center">
              <img src="/logo/vans logo.png" alt="nike"/>
            </div>
            <div className="bg-blue-200 p-5 rounded-lg hover:scale-105 transition-transform duration-300 items-center">
              <img src="/logo/caliber logo.png" alt="adidas"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
