
import { useEffect, useState } from 'react'

const CreatorDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('image');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [budget, setBudget] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');


    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        const uniqueFiles = files.filter(file => !mediaFiles.some((existing) => existing.name === file.name && existing.size === file.size));
        if (uniqueFiles.length === 0) return;
        const newUrls = uniqueFiles.map(file => URL.createObjectURL(file));
        setMediaFiles(prev => [...prev, ...uniqueFiles]);
        setPreviewUrls(prev => [...prev, ...newUrls]);

    }

    const removeFile = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
    return (
        <div className="p-6 mt-15 max-w-6xl mx-auto">
            <div className='border p-4 rounded shadow mb-8'>
                <h1 className='text-xl font-bold mb-2 text-center'>Create Campaign</h1>
                <div className='flex flex-col gap-2 flex-start '>
                    <input type="text"
                        placeholder="Campaign Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="rounded border p-2 md:w-auto w-full flex-1"
                    />

                    <div className='flex gap-2'>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="rounded border p-2 w-full"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>

                        <input
                            type="file"
                            multiple
                            accept={type === 'image' ? '/image*' : '/video*'}
                            onChange={handleFiles}
                            className="rounded border p-2 w-full"
                        />
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type="number"
                            placeholder="Total Budget ($)"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="rounded border p-2 w-full"
                        />

                        <input
                            type="number"
                            placeholder="Max Participants"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                            className="rounded border p-2 w-full"
                        />
                    </div>
                </div>

                {previewUrls.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative">
                                {type === 'image' ? (
                                    <img src={url} alt={`preview-${index}`} className="h-64 w-96 object-cover rounded border" />
                                ) : (
                                    <video src={url} controls className="h-64 w-96 object-cover rounded border" />
                                )}

                                <button onClick={() => removeFile(index)}
                                    className='absolute top-1 bg-red-600 text-white rounded-full px-3 py-2 text-xs'>
                                    X Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button className='mt-4 px-4 py-2 bg-green-600 text-white rounded '>
                    Create Campaign
                </button>
            </div>

            <h3 className='text-2xl font-semibold mb-3 text-center'>My Campaigns</h3>
        </div>
    )
}

export default CreatorDashboard
