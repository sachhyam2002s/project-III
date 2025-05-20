import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [user, setUser] = useState({ id: 1 });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(`http://192.168.1.3/product-api/kmeans_recommendation.php?user_id=${user.id}`);
          setRecommended(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  const logos = ["converse", "nike", "adidas", "new balance", "puma", "vans"];

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-blue-50 justify-around items-center px-5">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl leading-tight font-bold text-stone-800">Give Your Look a New Style.</h1>
          <p className="text-xl font-medium text-stone-700">Either walk like you're the king or walk like you don't care who the king is.</p>
          <button className="boder border-stone-800 bg-stone-700 text-white rounded-full px-4 py-1 font-semibold hover:bg-stone-600 transition duration-300 shadow-md">
            <a href="/" className="flex items-center gap-1">Explore <ArrowRight className="w-6 h-5" /></a>
          </button>
        </div>
        <div className="mt-10 lg:mt-0">
          <img src="/logo/converse-bg.png" alt="" className="w-full max-w-2xl p-4" />
        </div>
      </div>

      <div className="bg-blue-50 py-16 px-6">
        <h2 className="text-center font-bold text-4xl text-stone-800 mb-12 underline decoration-red-400 decoration-4 underline-offset-8">
          Recommended Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {recommended.length > 0 ? (
            recommended.map((product) => (
              <div key={product.id} className="bg-white p-3 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md text-center">
                <img
                  src={`http://192.168.1.3/product-api/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover mb-2 rounded"
                />
                <h4 className="font-semibold text-stone-700 capitalize">{product.name}</h4>
              </div>
            ))
          ) : (
            <p className='font-semibold '>No recommendations available.</p>
          )}
        </div>
      </div>

      <div className="p-10 bg-blue-100">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-7xl mx-auto">
          <div className="flex justify-center">
            <img
              src="photo/jordan.jpg"
              className="rounded-2xl w-full max-w-md hover:scale-105 transition-transform shadow-lg"
              alt="jordan"
            />
          </div>
          <div className="space-y-5 text-stone-800">
            <p className="font-semibold text-2xl">Exclusively Available on New Look</p>
            <h1 className="font-bold text-5xl">Air Jordan</h1>
            <p className="text-base text-justify">
              Air Jordan is a line of basketball shoes produced by Nike, Inc. Related apparel and accessories are marketed under Jordan
              Brand. The first Air Jordan shoe was produced for basketball player Michael Jordan during his time with the Chicago Bulls in late
              1984 and released to the public on April 1, 1985.
            </p>
            <div>
              <button className="border border-stone-700 rounded-full text-white bg-stone-800 font-semibold px-4 py-2 hover:bg-stone-700 transition duration-300 shadow-md">
                <a href="products.php" className="flex items-center gap-1">
                  Buy Now
                  <ArrowRight className="w-6 h-5" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex bg-blue-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 max-w-7xl mx-auto">
          {logos.map((logo, index) => (
            <div key={index} className="p-5 rounded-lg hover:scale-105 transition-transform duration-300 bg-white shadow-md flex justify-center items-center w-40 h-40">
              <img
                src={`/logo/${logo}.png`}
                alt="logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
