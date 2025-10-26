import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50'>
        <h1 className='text-4xl font-bold mb-4'>Media Engage</h1>
        <p className='mb-6'>Upload campaigns, get real CTR/engagement, let testers earn rewards.</p>
        <div className='space-x-4'>
          <Link to='/signup' className='px-4 py-2 bg-blue-600 text-white rounded'>Sign Up</Link>
          <Link to='/signin' className='px-4 py-2 bg-blue-600 text-white rounded'>Sign In</Link>
        </div>
    </div>
  )
}

export default HomePage
