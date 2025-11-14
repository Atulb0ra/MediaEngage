import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react'

const CreatorPage = () => {
    const { getToken } = useAuth()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('image');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [budget, setBudget] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [isCreating, setIsCreating] = useState(false);

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

    const create = async () => {
        if (!title || mediaFiles.length === 0 || !budget || !maxParticipants) {
            alert('Please fill all fields and upload at least one media file.');
            return;
        }

        try {
            setIsCreating(true);
            const token = await getToken();

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('totalBudget', budget);
            formData.append('maxParticipants', maxParticipants);

            mediaFiles.forEach(file => {
                formData.append('media', file);
            });

            // console.log("JWT Token:", token);

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/campaigns/create`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create campaign');
            }

            alert('Campaign created successfully!');
            console.log('Created:', data);

            setTitle('');
            setDescription('');
            setBudget('');
            setMaxParticipants('');
            setMediaFiles([]);
            setPreviewUrls([]);
        }
        catch (error) {
            console.error('Error creating campaign:', error);
            alert('Failed to create campaign. Please try again.');
        }
        finally {
            setIsCreating(false);
        }
    }

    return (
        <div className="px-4 py-8 mt-15 max-w-4xl mx-auto">
            <div className='border border-white p-4 rounded-xl mb-8 shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[color-mix(in_oklab,var(--color-black)_30%,transparent)]'>
                <h1 className='text-2xl font-bold text-center text-gray-200 mb-8'>Create Campaign</h1>
                <div className='flex flex-col gap-2 flex-start text-gray-400'>
                    <input type="text"
                        placeholder="Campaign Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="rounded border p-2 md:w-auto w-full flex-1"
                    />

                    <textarea type="text"
                        placeholder="Campaign Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
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
                            accept={type === 'image' ? 'image/*' : 'video/*'}
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

                <button onClick={create} disabled={isCreating} className={`px-4 py-2 mt-8 rounded transition transform active:scale-95 ${isCreating ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-white text-black'}`}>
                    {isCreating ? (
                        <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                            Uploading...
                        </span>
                    ) : (
                        'Create Campaign'
                    )}
                </button>
            </div>
        </div>
    )
}

export default CreatorPage;
