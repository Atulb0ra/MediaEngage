import React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Check } from 'lucide-react'

const Pricing = () => {
    const {getToken} = useAuth()

    const subscribe = async (plan) => {
        try {
            const token = await getToken();
            
            if (!token) {
                alert("Failed to get authentication token");
                return;
            }
            
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/subscription/create`, {
                method : "POST", 
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body : JSON.stringify({plan})
            });
            const data = await res.json()
            if(data.url) window.location.href = data.url;
            else alert("Failed to create checkout");
        } catch (error) {
            console.error('Subscription error:', error);
            alert("Failed to process subscription");
        }
    } 

    const features = {
        free : ["2 tasks per day", "Cannot Create Campaigns", "Basic Support"],
        premium : ["20 tasks per day", "Can Create 5 Campaigns in a week", "Access to pro Tools"],
        premium_plus : ["40 tasks per day", "Can Create 12 Campaigns in a week", "Access to Advanced AI Tools"],
    }
    const cardStyles="bg-white p-6 border rounded-2xl shadow-md hover:shadow-xl transition-all text-center flex flex-col"
  return (
    <div className='p-10 max-w-6xl mx-auto'>
      <h2 className='text-3xl text-white text-center font-bold mb-10'>Choose Your Plan</h2>
      <div className ='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* free */}
        <div className={cardStyles}>
            <h3 className='text-2xl font-bold mb-2'>Free</h3>
            <p className='text-gray-500 mb-4'>A Simple Start For Everyone</p>
            <ul className='text-left space-y-2 flex-1'>
                {features.free.map((f, i) => (
                    <li className='flex gap-2' key={i}>
                        <Check className='w-5 h-5 text-green-600'/>{f}
                    </li>
                ))}
            </ul>
            <p className="mt-6 text-xl font-bold">₹0 / month</p>
        </div>

        {/* premium */}
        <div className={cardStyles}>
            <h3 className='text-2xl font-bold mb-2'>Premium</h3>
            <p className='text-gray-500 mb-4'>Perfect for active creators</p>
            <ul className='text-left space-y-2 flex-1'>
                {features.premium.map((f, i) => (
                    <li className='flex gap-2' key={i}>
                        <Check className='w-5 h-5 text-green-600'/>{f}
                    </li>
                ))}
            </ul>
            <button onClick = {() => subscribe('premium')} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl w-full p-3 cursor-pointer'>Subscribe ₹299/month</button>
        </div>

        {/* Premium plus */}
        <div className={cardStyles}>
            <h3 className='text-2xl font-bold mb-2'>Premium Plus</h3>
            <p className='text-gray-500 mb-4'>for power users</p>
            <ul className='text-left space-y-2 flex-1'>
                {features.premium_plus.map((f, i) => (
                    <li className='flex gap-2' key={i}>
                        <Check className='w-5 h-5 text-green-600'/>{f}
                    </li>
                ))}
            </ul>
            <button onClick = {() => subscribe('premium_plus')} className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl w-full p-3 cursor-pointer'>Subscribe ₹499/month</button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
