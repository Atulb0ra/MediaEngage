import robot from '../assets/robot.png';
import { Link } from 'react-router-dom';

console.log('Hero component loaded, robot asset ->', robot);

const Hero = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 bg-linear-to-r from-[#0f172a] to-[#1e293b] rounded-2xl shadow-lg p-8 mt-10 mb-8 py-10 max-w-6xl mx-auto">
            
            {/* Left side - image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src={robot}
                alt="Friendly robot poster"
                className="w-full max-w-md rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right side - text */}
            <div className="md:w-1/2 text-center md:text-left text-white space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Grow with MediaEngage 🚀</h2>
              <p className="text-gray-300 text-lg md:text-xl">
                Launch creative campaigns, test engagement in real-time, and connect your ideas with the world.
                Whether it’s <span className="text-blue-400">ads, videos</span> or <span className="text-green-400">thumbnails</span> — get genuine insights & rewards.
              </p>

              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/creator"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white shadow-md transition"
                >
                  Create Campaign
                </Link>
                <Link
                  to="/learn-more"
                  className="px-6 py-3 border border-gray-400 rounded-xl font-semibold text-gray-300 hover:bg-gray-700 transition"
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
