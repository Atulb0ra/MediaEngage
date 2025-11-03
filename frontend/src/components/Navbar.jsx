import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from '@clerk/clerk-react';
import { NavLink, Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between md:px-20 h-16">
        <div className="flex items-center">
          <Link to='/' className="text-xl font-bold text-white">Media Engage</Link>
        </div>

        <div className="flex items-center gap-4">

          <Link to="/creator" className="hidden sm:block text-m text-gray-300 hover:text-white">Create</Link>
          <Link to="/dashboard" className="hidden sm:block text-m text-gray-300 hover:text-white">My Campaigns</Link>

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
    </nav>
  )
}

export default Navbar
