import React from 'react'

const Footer = () => {
  return (
    <footer className="text-white py-4 flex-end">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Media Engage. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
