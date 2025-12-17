import { Link } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react"
import robot from '../assets/robot.png'
import Hero from '../components/Hero'
import AllCampaign from '../components/AllCampaign'


const HomePage = () => {

  const { isLoaded, isSignedIn } = useUser()
  console.log('HomePage debug:', { isLoaded, isSignedIn, robot })

  if (!isLoaded) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      {isSignedIn && <Hero />}

      {isSignedIn ? (
        <AllCampaign />
      ) : (
          <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl md:text-6xl text-black font-semibold mb-4'>Media Engage</h1>
            <h3 className='text-gray-900 mb-4 text-2xl md:text-4xl'>Create Campaigns!</h3>
            <p className='m-2 mb-6 text-[13px] md:text-lg text-gray-700'>Upload campaigns, get real CTR/engagement, let testers earn rewards.</p>
            <div className='flex flex-col md:flex-row gap-4'>
              <Link to='/signin' className='px-8 py-3 bg-green-800 rounded-lg '>
                <p className='text-white'>Ready to use MediaEngage</p>
                <p className='text-gray-300 text-sm'>Please Sign In to get Started....</p>
              </Link>
            </div>
          </div>

      )}
    </div>
  )
}

export default HomePage
