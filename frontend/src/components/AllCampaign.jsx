import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import CampaignCard from './CampaignCard'
import { ChevronDownIcon } from 'lucide-react'

const AllCampaign = () => {
    const { getToken } = useAuth()
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('image');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const token = await getToken();
                const base = import.meta.env?.VITE_BACKEND_URL || "http://localhost:5000";
                const res = await fetch(`${base}/api/campaigns/`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (!res.ok) {
                    console.error('Failed to fetch my campaigns', res.status);
                    return;
                }
                const data = await res.json();
                setCampaigns(data || []);
                // console.debug('Fetched campaigns:', data);
            } catch (err) {
                console.error('Error fetching campaigns:', err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const imageCampaigns = campaigns.filter(c => c.type === 'image');
    const videoCampaigns = campaigns.filter(c => c.type === 'video');

    const displayedCampaigns = activeTab === 'image' ? imageCampaigns : videoCampaigns;


    return (

        <div className="p-4">
            {isLoading ? (
                <div className="col-span-full flex items-center justify-center p-8 min-h-screen">
                    <div className="text-center">
                        <svg className="animate-spin mx-auto h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                        <div className="mt-3 text-white">Loading campaigns...</div>
                    </div>
                </div>
            ) : campaigns.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">No campaigns yet.</div>
            ) : (
                <>

                    <div className="flex justify-between mt-1">
                        <h1 className='text-2xl font-semibold'>Recently added</h1>
                       <div className='relative'>
                       <button onClick={() => setOpen(!open)}
                        className='flex w-[128px] items-center border border-gray-300 rounded-lg justify-between px-4 py-2'
                        >
                            <span className='text-black font-semibold text-md'>{activeTab}</span>
                            <ChevronDownIcon className='h-5 w-5 text-gray-800'/>
                        </button>
                        {open && (
                            <div className='absolute w-full border border-gray-200 rounded-lg shadow-md z-10'>
                                <p onClick = {() => setActiveTab('image')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">YouTube Thumbnail</p>
                                <p onClick = {() => setActiveTab('video')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Video Ads</p>
                            </div>
                        )}
                       </div>
                        
                    </div>

                    <div className="w-full">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {displayedCampaigns.length > 0 ? (
                                displayedCampaigns.map(item => (
                                    <CampaignCard key={item._id} campaign={item} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-400">
                                    No {activeTab == 'image' ? 'Thumbnails' : 'Ads'} campaigns found.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default AllCampaign
