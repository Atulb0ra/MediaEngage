import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import CampaignCard from '../components/CampaignCard'

const MyCampaign = () => {
    const { getToken } = useAuth()
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('image');


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const token = await getToken();
                const base = import.meta.env?.VITE_BACKEND_URL || "http://localhost:5000";
                const res = await fetch(`${base}/api/campaigns/my`, {
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
        <div className="p-8">
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
                    <h1 className="text-2xl md:text-4xl text-white font-bold mb-3 text-center">
                        My Campaigns
                    </h1>

                    <div className="flex justify-center mb-8 mt-8">
                        <button
                            onClick={() => setActiveTab('image')}
                            className={`px-6 py-2 rounded-l-lg font-medium transition-all duration-200 
                ${activeTab === 'image'
                                    ? 'bg-blue-600 text-white scale-105 shadow-lg'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            Thiumbnails
                        </button>
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`px-14 py-2 rounded-r-lg font-medium transition-all duration-200 
                ${activeTab === 'video'
                                    ? 'bg-pink-600 text-white scale-105 shadow-lg'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            
                        
                        Ads
                        </button>
                    </div>

                    <div className="md: w-[90%] lg:w-[80%] mx-auto">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedCampaigns.length > 0 ? (
                            displayedCampaigns.map(item => (
                                <CampaignCard key={item._id} campaign={item} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-400 py-10">
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

export default MyCampaign
