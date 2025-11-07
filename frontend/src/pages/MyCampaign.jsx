import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

const MyCampaign = () => {
    const { getToken } = useAuth()
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async () =>{
            const res = await fetch(`${import.meta.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/my-campaigns`, {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json();
            setCampaigns(data);
        }
    }, []);

  return (
    <div>
        <h1 className='text-4xl md:text-6xl text-white font-bold mb-4'>My Campaigns</h1>
        <div>
            {campaigns.map(item => <CampaignCard key = {item._id} campaign = {item}/> )};
        </div>
    </div>
  )
}

export default MyCampaign
