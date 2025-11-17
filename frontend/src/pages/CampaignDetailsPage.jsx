
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react"
import { UserCircleIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

const CampaignDetailsPage = () => {
    const { id } = useParams()
    const [campaign, setCampaign] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [creatorName, setCreatorName] = useState('');
    const [activeTab, setActiveTab] = useState("details");

    const media = campaign.media || [];
    const mediaType = campaign.media?.[0]?.resource_type || campaign.type;

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/${id}`);
                const data = await res.json();
                setCampaign(data);

                // console.log(data.creatorId)
                if (data.creatorId) {
                    try {
                        const creatorRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/users/${data.creatorId}`);
                        if (creatorRes.ok) {
                            const creatorData = await creatorRes.json();
                            // console.log("Creator data:", creatorData);
                            setCreatorName(creatorData.username || creatorData.name || 'Creator');
                        }
                    } catch (err) {
                        console.error('Error fetching creator info:', err);
                        setCreatorName('Creator');
                    }
                }
            }
            catch (err) {
                console.error('Error fetching campaign details:', err);
            }
            setLoading(false);
        })();
    }, [id]);

    if (loading) {
        return <div className="col-span-full flex items-center justify-center p-8 min-h-screen">
            <div className="text-center">
                <svg className="animate-spin mx-auto h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                <div className="mt-3 text-white">Loading campaign...</div>
            </div>
        </div>
    }
    if (!campaign) {
        return <div className='text-white text-center'>Campaign not found.</div>
    }

    const handlePrev = () => {
        setIndex((prev) => (prev == 0 ? media.length - 1 : prev - 1));
    }
    const handleNext = () => {
        setIndex((prev) => (prev == media.length - 1 ? 0 : prev + 1))
    }

    const getThumbnail = (url) => {
        try {
            if (!url.includes("/upload/")) return null;

            return url.replace("/upload/", "/upload/so_1/").replace(".mp4", ".jpg");
        } catch {
            return null;
        }
    };




    if (!loading) {
        return (
            <div className='w-full flex justify-center mt-4'>
                <div className='w-[85%] max-w-[1200px] grid grid-cols-2 gap-10 text-white'>
                    <div className='h-[calc(100vh-100px)]'>
                        <h1 className='text-4xl font-bold mb-3'>{campaign.title}</h1>


                        {/* user */}

                        <div className='flex justify-between mb-4'>
                            <div className='flex justify-center gap-3'>
                                <UserCircleIcon className='w-10 h-10 text-gray-300' />
                                <div>
                                    <p className='text-gray-200 font-medium'>{creatorName}</p>
                                    <p className='text-gray-200 text-sm'>{new Date(campaign.createdAt).toDateString()}</p>
                                </div>
                            </div>

                            <button >
                                <ThumbsUp size={18} />
                                <span>votes</span>
                            </button>
                        </div>

                        {media.length > 0 && (
                            <div className='relative w-full flex justify-center'>
                                {mediaType == "video" ? (
                                    <video
                                        src={media[index].url}
                                        controls
                                        poster={getThumbnail(media[index].url)}
                                        preload="none"
                                        className='w-full rounded-lg aspect-video object-cover'
                                    />
                                ) :
                                    (
                                        <img src={media[index].url}
                                            alt="Campaign Media"
                                            className='rounded-xl w-full object-cover border border-gray-700 shadow-lg transition-all duration-300'
                                        />
                                    )}

                                {media.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full'
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full'
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}

                                <div className='flex gap-2 absolute bottom-3'>
                                    {media.map((_, i) => (
                                        <div key={i} onClick={() => setIndex(i)}
                                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i == index ? "bg-white" : "bg-gray-500"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='h-[calc(100vh-100px)]'>

                        <div className='flex gap-3'>
                            <button onClick={() => setActiveTab("details")}
                                className={`text-2xl font-semibold mt-2 ${activeTab === "details" ? "text-white border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-200"}`}>Description</button>
                            <button onClick={() => setActiveTab("chats")}
                                className={`text-2xl font-semibold mt-2 ${activeTab === "chats" ? "text-white border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-200"}`}>Chats</button>
                        </div>
                        <hr className='border-t border-gray-500 mt-4' />

                        {activeTab === "details" && (
                            <>
                                <p className='text-gray-300 mt-2'>{campaign.description}</p>
                                <div className='mt-6'>
                                    <p><strong>Reward:</strong> {campaign.perUserBudget}</p>
                                    <p><strong>Max participants:</strong> {campaign.maxParticipants}</p>
                                    <p><strong>Status:</strong> {campaign.status}</p>
                                </div>
                            </>
                        )}

                        {activeTab === "chats" && (
                            <>None</>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default CampaignDetailsPage
