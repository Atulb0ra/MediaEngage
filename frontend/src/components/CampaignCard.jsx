import { Link } from 'react-router-dom'
import { useState } from 'react'

const CampaignCard = ({ campaign }) => {
  const mediaSrc = campaign.media?.[0]?.url || "";
  const mediaType = campaign.media?.[0]?.resource_type || campaign.type;
  const [imgLoaded, setImgLoaded] = useState(false);

  // If there is no media, treat as loaded so details show immediately
  const shouldShowDetails = !mediaSrc || imgLoaded;

  const getThumbnail = (url) => {
    try {
      if (!url.includes("/upload/")) return null;

      return url.replace("/upload/", "/upload/so_1/").replace(".mp4", ".jpg");
    } catch {
      return null;
    }
  };

  return (
    <div className="rounded-xl mt-1 md:mt-2 hover:scale-[1.02] transition-transform duration-200">
      {mediaSrc ? (
        <div className="w-full mb-3">
          {!imgLoaded && mediaType !== 'video' && (
            <div className="object-cover bg-gray-700 rounded-md animate-pulse" aria-hidden="true" />
          )}
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              controls
              className="w-full h-[320px] object-cover rounded-md"
              poster={getThumbnail(mediaSrc)}
              preload="metadata"
              onLoadedMetadata={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />
          ) : (
            <img
              src={mediaSrc}
              alt={campaign.title}
              className="w-full h-[320px] object-cover rounded-md"
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
          <div className="mt-3 flex justify-between items-center">
            <Link to={`/campaign/${campaign._id}`} className="text-sm bg-green-800 px-3 py-1 rounded text-white">open</Link>
            <span className="text-xs text-gray-900"><span className='text-black font-semibold'>Status:</span> {campaign.status}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default CampaignCard