import { Link } from 'react-router-dom'
import { useState } from 'react'

const CampaignCard = ({ campaign }) => {
  const mediaSrc = campaign.media?.[0]?.url || "";
  const mediaType = campaign.media?.[0]?.resource_type || campaign.type;
  const [imgLoaded, setImgLoaded] = useState(false);

  // If there is no media, treat as loaded so details show immediately
  const shouldShowDetails = !mediaSrc || imgLoaded;

  return (
    <div className="bg-[#14131e] border border-[#2a2a3a] rounded-xl p-4 mt-1 md:mt-2 hover:scale-[1.02] transition-transform duration-200">
      {mediaSrc ? (
        <div className="w-full mb-3">
          {!imgLoaded && (
            <div className="w-full h-44 bg-gray-700 rounded-md animate-pulse" aria-hidden="true" />
          )}
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              alt={campaign.title}
              controls
              className={`w-full h-44 object-cover rounded-md ${imgLoaded ? 'block' : 'hidden'}`}
              onLoadedMetadata={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
          ) : (
            <img
              src={mediaSrc}
              alt={campaign.title}
              className={`w-full h-44 object-cover rounded-md ${imgLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
          )}
        </div>
      ) : (
        <div className="w-full h-44 bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-400">No media</div>
      )}

      {shouldShowDetails && (
        <>
          <h3 className='font-semibold text-lg text-gray-200'>{campaign.title}</h3>
          <p className="text-sm text-gray-400 my-2">Reward : ${campaign.perUserBudget} • Limit: {campaign.maxParticipants}</p>
          <div className="mt-3 flex justify-between items-center">
            <Link to={`/campaign/${campaign._id}`} className="text-sm bg-purple-600 px-3 py-1 rounded">open</Link>
            <span className="text-xs text-gray-400">Status: {campaign.status}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default CampaignCard
