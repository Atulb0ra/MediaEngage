import heroimage from '../assets/heroimage.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row justify-between rounded-3xl p-4 mt-6 mb-3 gap-4 mx-2 bg-[#f6f3ef] border border-gray-200 ">
            
            {/* Left side - image */}
            <div className="md:w-1/3 flex justify-center">
              <img
                src={heroimage}
                alt="Friendly robot poster"
                className=" w-full max-w-md rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right side - text */}
            <div className="md:w-2/3 text-center md:text-left text-black space-y-4 p-6">
              <h2 className="text-xl md:text-3xl font-semibold">MediaEngage - Grow with MediaEngage</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Launch creative campaigns, test engagement in real-time, and connect your ideas with the world.
                Whether it’s <span className="text-blue-400">ads, videos</span> or <span className="text-green-400">thumbnails</span> — get genuine insights & rewards.
              </p>

              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/creator"
                  className="px-6 py-3 bg-green-800 hover:bg-green-900 rounded-xl font-semibold text-white shadow-md transition"
                >
                  Create Campaign
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 border border-gray-400 rounded-xl font-semibold text-gray-900 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>
    </div>
  )
}

export default Hero
