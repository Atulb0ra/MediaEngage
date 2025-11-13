import { Link } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react"
import AllCampaignPage from './AllCampaignPage'


const HomePage = () => {

  const { isSignedIn, user } = useUser()

  return (
    <div>
      {isSignedIn ? (
        <AllCampaignPage />
      )
        :
        <div className='min-h-screen flex flex-col justify-center items-center'>
          <h1 className='text-4xl md:text-6xl text-white font-bold mb-4'>Media Engage</h1>
          <h3 className='text-gray-400 mb-4 text-2xl md:text-4xl'>Create Campaigns!</h3>
          <p className='m-2 mb-6 text-[13px] md:text-lg text-gray-200'>Upload campaigns, get real CTR/engagement, let testers earn rewards.</p>
          <div className='flex flex-col md:flex-row gap-4'>
            <Link to='/signin' className='px-4 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.05)]
 bg-white rounded shadow-white/20 hover:shadow-white/40 border border-white/20 hover:border-white/40'>
              <p className='text-black'>Get Started</p>
              <p className='text-gray-900 text-sm'>Ready-to use MediaEngage</p>
            </Link>
            <Link to='/signin' className='px-4 py-2 shadow-[0_0_8px_rgba(255,255,255,0.15)]
  bg-[color-mix(in_oklab,var(--color-black)_30%,transparent)] rounded shadow-white/20 hover:shadow-white/40 border border-white/20 hover:border-white/40'>
              <p className='text-white'>Get Started</p>
              <p className='text-gray-400 text-sm'>Ready-to use MediaEngage</p>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default HomePage
