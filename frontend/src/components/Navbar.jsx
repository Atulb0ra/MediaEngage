import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
      <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between px-20 h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Media Engage</h1>
            </div>
           
          <div className="flex items-center">
            <a href="/signin" className="px-4 py-2 bg-white text-black rounded-md ">Sign In</a>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
