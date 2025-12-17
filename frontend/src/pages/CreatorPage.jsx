import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react'
import { Upload } from 'lucide-react'

const CreatorPage = () => {
    const { getToken } = useAuth()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('image');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
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
        <div className="px-4 mt-8 max-w-4xl mx-auto">
            <div className='border border-white p-4 mb-8'>
                <div className='flex flex-col mb-10 items-center'>
                    <h1 className='text-5xl font-bold text-center text-black'>Free <span className='text-green-800'> YouTube Thumbnail</span> And <span className='text-green-800'>Advertisment</span>  Tester</h1>
                    <p className='text-black text-2xl mt-2'>Preview & Compare Your Thumbnails And Advertisments</p>
                    <p className='text-black text-xl mt-5'>The Ultimate Thumbnail & Advertisment Preview Tool to Test Your Thumbnails</p>
                    <p className='text-black text-xl'>and Advertisment and Optimize Click-Through Rates</p>
                </div>
                <div className='flex flex-col gap-2 flex-start text-gray-400 rounded-4xl'>

                    <div className='flex gap-2'>
                        <input type="w-2/3 text"
                            placeholder="Campaign Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="rounded-xl border p-2 md:w-auto w-full flex-1"
                        />
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="w-1/3 rounded-xl border p-2"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <textarea type="text"
                        placeholder="Campaign Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="rounded-2xl border p-2 md:w-auto w-full flex-1"
                    />

                </div>

                {previewUrls.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4'>
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative">
                                {type === 'image' ? (
                                    <img src={url} alt={`preview-${index}`} className="h-54 w-74 object-fill rounded-xl border" />
                                ) : (
                                    <video src={url} controls className="h-64 w-74 object-fill rounded-2xl border" />
                                )}

                                <button onClick={() => removeFile(index)}
                                    className='absolute top-1 bg-red-600 text-white rounded-full px-3 py-2 text-xs'>
                                    X Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}


                <div className='flex justify-center mt-4'>
                    <label
                        className="w-164 h-84 rounded-2xl flex items-center justify-center
                            border-2 border-dashed border-green-500
                            cursor-pointer hover:bg-green-50 transition mt-6"
                    >
                        <input
                            type="file"
                            multiple
                            accept={type === 'image' ? 'image/*' : 'video/*'}
                            onChange={handleFiles}
                            className="hidden"
                        />
                        <div className='flex flex-col items-center'>
                            <div className='w-15 h-15 flex items-center justify-center rounded-full bg-green-400' >
                                <Upload className="text-black text-[40px] " />
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-black text-2xl font-bold mt-3'>Upload your Thumbnail or Advertisment</p>
                                <p className='text-gray-700 text-lg'>Browse your image or Videos...</p>
                                <p className='text-gray-500'>Supports JPG, PNG • Recommended: 1280x720px</p>
                                <div className=' text-center px-7 py-2 bg-green-600 text-white rounded-xl mt-4'>Choose File</div>
                            </div>
                        </div>
                    </label>
                </div>

                <button onClick={create} disabled={isCreating} className={`mx-auto block px-10 py-3 mt-10 rounded transition transform active:scale-95 ${isCreating ? 'bg-green-600 text-gray-200 cursor-not-allowed' : 'bg-green-700 text-white'}`}>
                    {isCreating ? (
                        <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                            Uploading...
                        </span>
                    ) : (
                        'Upload'
                    )}
                </button>
            </div>
        </div>
    )
}

export default CreatorPage;