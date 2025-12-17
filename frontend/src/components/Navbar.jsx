import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, UserProfile } from '@clerk/clerk-react';
import { NavLink, Link } from "react-router-dom"
import { Search, Star, MessageSquare } from "lucide-react";
import logo from '../assets/logo.png'


const Navbar = () => {
  const { isLoaded } = useAuth()

  if (!isLoaded) return null;
  return (
    <nav className="w-full mx-auto ">
      <div className="flex h-16 gap-2">
        <div className="w-1/3 flex items-center gap-3 p-4">
          <div className='flex items-center gap-1'>
            <img src={logo} className='w-7 block' />
            <Link to='/' className="text-2xl font-bold text-green-600">MediaEngage</Link>
          </div>

          <div className='flex items-center gap-6'>
            <NavLink to="/" className="hidden lg:block text-m font-semibold text-gray-900 hover:text-black">Home</NavLink>
            <NavLink to="/creator" className="hidden lg:block text-m font-semibold text-gray-900 hover:text-black">Campaigns</NavLink>
            {/* <NavLink to="/my" className="hidden lg:block text-m font-semibold text-gray-900 hover:text-black">My Campaigns</NavLink> */}
            <NavLink to="/jobs" className="hidden lg:block text-m font-semibold text-9ray-800 hover:text-black">Jobs</NavLink>
            <NavLink to="/about" className="hidden lg:block text-m font-semibold text-9ray-800 hover:text-black">About</NavLink>
            {/* <NavLink to="/ai-analysis" className="hidden lg:block text-m font-semibold text-gray-900 hover:text-black">AI Analysis</NavLink> */}
          </div>

        </div>

        <div className='w-2/3 flex items-center gap-10'>
          <div className='flex w-3/4 items-center relative'>
            <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
            <input type='text' placeholder='Search' className='w-full border border-gray-300 rounded-md p-2 pl-10' />
            <p className='absolute border border-gray-300 top-1/2 -translate-y-1/2 rounded-sm right-2 px-2'>/</p>
          </div>


          <div className='flex w-1/4 items-center gap-2'>
            <div className='flex relative items-center'>
              <Star className='absolute left-2 w-5 h-5 fill-black top-1/2 -translate-y-1/2 text-black' />
              <NavLink to="/pricing" className="hidden lg:block text-m font-semibold text-gray-900 border border-gray-300 rounded-md px-4 py-2 hover:text-black pl-10">Get Pro</NavLink>
            </div>

            <MessageSquare className='h-7 w-7 text-gray-700' />

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-black font-semibold rounded-md">Sign In</button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: "40px",
                      height: "40px",
                      border: "2px solid white",
                      borderRadius: "50%",
                    },
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>

      <hr className='w-full border-t border-gray-500' />
    </nav>
  )
}

export default Navbar
