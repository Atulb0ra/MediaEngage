import { useState, useEffect } from "react"
import { useUser, useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react"
import { UserCircleIcon } from "@heroicons/react/24/solid";


const CampaignDetails = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [campaign, setCampaign] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [creatorName, setCreatorName] = useState('');
    const [activeTab, setActiveTab] = useState("details");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [pollCounts, setPollCounts] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [replyTo, setReplyTo] = useState(null);

    const { getToken } = useAuth();

    const media = campaign.media || [];
    const mediaType = campaign.media?.[0]?.resource_type || campaign.type;

    const formatCount = (num) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem("userId", user.id);
        }
    }, [user]);


    useEffect(() => {
        (async () => {
            const token = await getToken()
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/${id}`);
                const data = await res.json();
                setCampaign(data);

                if (Array.isArray(data?.media)) {
                    setPollCounts(data.pollCounts && Array.isArray(data.pollCounts) ? data.pollCounts : new Array(data.media.length).fill(0))
                }
                else {
                    setPollCounts([]);
                }

                const storedUserId = localStorage.getItem("userId");
                if (Array.isArray(data?.votes) && storedUserId) {
                    const voteRecord = data.votes.find((v) => v.userId === storedUserId);
                    if (voteRecord && typeof voteRecord.index === "number") {
                        setSelectedIndex(voteRecord.index);
                    }
                }

                // console.log(data.creatorId)
                if (data.creatorId) {
                    try {
                        const creatorRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/users/${data.creatorId}`, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
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


    // for vote counting
    const handleVote = async (i) => {
        const token = await getToken();

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Login required to vote");
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/${id}/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ userId, index: i })
            });

            const data = await res.json();

            if (!Array.isArray(pollCounts) || pollCounts.length < media.length) {
                setPollCounts((prev) => {
                    const base = Array.isArray(prev) ? [...prev] : [];
                    while (base.length < media.length) base.push(0);
                    return base;
                });
            }

            if (data?.success && Array.isArray(pollCounts)) {
                setPollCounts(data.pollCounts);
                setSelectedIndex(i);
            }
            else {
                console.error("Vote error :", data);
            }
        }
        catch (error) {
            console.error("Vote error :", error);
        }
    }


    const fetchChat = async () => {
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/${id}/chat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                const text = await res.text();
                console.error('Failed to fetch chat', res.status, text);
                return;
            }
            const data = await res.json();
            setChatMessages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const send = async () => {
        if (!chatInput.trim()) return;
        const token = await getToken();
        // console.log('Sending chat', { tokenPresent: !!token, tokenLen: token?.length, body: { userId: user?.id, username: user?.fullName || user?.username, content: chatInput, replyTo } });
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/${id}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    username: user.fullName || user.username || "User",
                    content: chatInput,
                    replyTo
                })
            })
            if (!res.ok) {
                const text = await res.text();
                console.error('Send failed', res.status, text);
                return;
            }
            const newMsg = await res.json();
            setChatMessages(prev => [...prev, newMsg]);
            setChatInput("");
            setReplyTo(null);
        }
        catch (error) {
            console.error("review error : ", error);
        }
    }

    useEffect(() => {
        fetchChat();
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
                <div className='w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-white'>
                    <div className='min-h-fit'>
                        <h1 className='text-2xl text-black font-semibold mb-3'>{campaign.title}</h1>


                        {/* user */}

                        <div className='flex justify-between mb-4'>
                            <div className='flex justify-center gap-3'>
                                <UserCircleIcon className='w-10 h-10 text-black' />
                                <div>
                                    <p className='text-black font-medium'>{creatorName}</p>
                                    <p className='text-gray-700 text-sm'>{new Date(campaign.createdAt).toDateString()}</p>
                                </div>
                            </div>

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



                    <div className='min-h-fit'>

                        <div className='flex gap-3'>
                            <button onClick={() => setActiveTab("details")}
                                className={`text-2xl font-semibold mt-2 ${activeTab === "details" ? "text-black border-b-2 border-gray-900" : "text-gray-600"}`}>Description</button>
                            <button onClick={() => setActiveTab("reviews")}
                                className={`text-2xl font-semibold mt-2 ${activeTab === "reviews" ? "text-black border-b-2 border-gray-900" : "text-gray-600"}`}>Reviews</button>
                        </div>
                        <hr className='border-t border-gray-900 mt-3 mb-6' />

                        {activeTab === "details" && (
                            <>
                                <p className='text-black font-semibold mt-1 text-md'>{campaign.description}</p>
                                <div className='mt-2'>
                                    <p className="text-gray-700 font-semibold"><strong className='text-green-700 font-semibold text-md'>Status:</strong> {campaign.status}</p>
                                </div>

                                <h2 className="text-2xl fonnt-semibold text-black font-semibold mt-2">
                                    {mediaType === "video" ? "Select Best Ad" : "Select Best Thumbnail"}
                                </h2>

                                <div className="flex flex-col gap-3 mt-3">
                                    {media.map((m, i) => (
                                        <div key={i}
                                            onClick={() => handleVote(i)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === "Enter" && handleVote(i)}
                                            className="flex items-center justify-between border border-gray-900 rounded-lg p-3 cursor-pointer hover:border-blue-500 transition"
                                        >
                                            <div className="text-lg font-semibold text-black">
                                                {mediaType === 'video' ? `Ad ${i + 1}` : `Thumbnail ${i + 1}`}
                                            </div>
                                            <div className='text-gray-700'>
                                                <span className="text-black font-semibold">Votes:</span>{formatCount(pollCounts[i] || 0)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === "reviews" && (
                            <div className="flex flex-col h-[70vh] rounded-lg">

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-5 scroll-smooth scrollbar-hide">


                                    {chatMessages.length === 0 ? (
                                        <div className="text-gray-800 text-center mt-10">
                                            No reviews yet...
                                        </div>
                                    ) : (
                                        chatMessages
                                            .filter(msg => !msg.replyTo) // top-level messages
                                            .map(msg => {

                                                const replies = chatMessages.filter(r => r.replyTo === msg._id);
                                                const isMe = msg.userId === user?.id;

                                                return (
                                                    <div key={msg._id} className="flex flex-col gap-2">

                                                        {/* Main message */}
                                                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${isMe ? "ml-auto bg-green-500" : "bg-[#E9DFC9]"}`}>
                                                            <p className={` text-md font-bold mb-1 ${isMe ? "text-white" : "text-black"}`}>{msg.username}</p>
                                                            <p className={`${isMe ? "text-white" : "text-gray-800"}`}>{msg.content}</p>

                                                            <button
                                                                className="text-xs mt-2 text-red-600 font-semibold hover:underline"
                                                                onClick={() => setReplyTo(msg._id)}
                                                            >
                                                                Reply
                                                            </button>
                                                        </div>

                                                        {/* Replies (collapsible) */}
                                                        {replies.length > 0 && (
                                                            <details className="ml-4 text-sm">
                                                                <summary className="cursor-pointer text-gray-500 hover:text-black">
                                                                    {replies.length} replies
                                                                </summary>

                                                                <div className="mt-2 flex flex-col gap-2">
                                                                    {replies.map(rep => {
                                                                        const isReplyMe = rep.userId === user?.id;
                                                                        return (
                                                                            <div
                                                                                key={rep._id}
                                                                                className={`rounded-md px-3 py-2 max-w-[75%] text-xs ${isReplyMe ? "bg-green-400 ml-auto" : "bg-[#F6F1E8]"}`}
                                                                            >
                                                                                <p className={` text-md font-bold mb-1 ${isMe ? "text-black" : "text-white"}`}>
                                                                                    {rep.username || rep.userId.slice(0, 6)}
                                                                                </p>
                                                                                <p className={`${isMe ? "text-gray-800" : "text-white"}`}>{rep.content}</p>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </details>
                                                        )}
                                                    </div>
                                                );
                                            })
                                    )}


                                </div>

                                {/* Reply Indicator */}
                                {replyTo && (
                                    <div className="bg-gray-900 text-sm px-4 py-1 text-blue-400">
                                        Replying... <button onClick={() => setReplyTo(null)} className="text-red-400 ml-2">Cancel</button>
                                    </div>
                                )}

                                {/* Input */}
                                <div className=" p-3 flex gap-3 ">
                                    <input
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        placeholder="Write a message..."
                                        className="flex-1 text-black border px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />

                                    <button
                                        onClick={send}
                                        className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4"
                                    >
                                        Send
                                    </button>
                                </div>

                            </div>
                        )}


                    </div>
                </div>
            </div>
        )
    }
}

export default CampaignDetails