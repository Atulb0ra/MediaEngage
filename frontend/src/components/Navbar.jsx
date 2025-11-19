import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, UserProfile } from '@clerk/clerk-react';
import { NavLink, Link } from "react-router-dom"

const Navbar = () => {
  const {isLoaded} = useAuth()

  if(!isLoaded) return null;
  return (
    <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between md:px-20 h-16">
        <div className="flex items-center">
          <Link to='/' className="text-xl font-bold text-white">Media Engage</Link>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/" className="hidden lg:block text-m text-gray-300 hover:text-white">Home</Link>
          <Link to="/creator" className="hidden lg:block text-m text-gray-300 hover:text-white">Create Campaigns</Link>
          <Link to="/my" className="hidden lg:block text-m text-gray-300 hover:text-white">My Campaigns</Link>
          <Link to="/pricing" className="hidden lg:block text-m text-gray-300 hover:text-white">Pricing</Link>
          <Link to="/about" className="hidden lg:block text-m text-gray-300 hover:text-white">About</Link>
          <Link to="/ai-analysis" className="hidden lg:block text-m text-gray-300 hover:text-white">AI Analysis</Link>
        </div>

          <div className='flex items-center'>
            <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white text-black rounded-md">Sign In</button>
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
      <hr className='border-t border-gray-500'/>
    </nav>
  )
}

export default Navbar
