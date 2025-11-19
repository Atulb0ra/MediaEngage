import React from 'react'

const AboutPage = () => {
  return (
    <div className='w-full flex justify-center mt-8'>
      <div className='text-white w-[85%] max-w-[1100px]'>


        <div className="w-full flex flex-col items-center mb-6">
          <div className="px-6 py-2 rounded-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 
                          border border-indigo-400/20 text-indigo-300 text-sm tracking-wide">
            Empower your creativity with intelligent AI + user-driven testing
          </div>
        </div>

        <div className='bg-linear-to-br from-gray-900/80 to-gray-700/40 
                          backdrop-blur-sm border border-gray-700 
                          rounded-2xl p-8 shadow-lg space-y-6 mt-6'>


          {/* about platform */}
          <h1 className='text-3xl md:text-5xl font-semibold mb-4 text-indigo-300 tracking-wide'>What is this platform?</h1>
          <p className='text-lg md:text-xl text-gray-300 leading-relaxed mt-6'>This platform is designed to help creators, marketers, and brands optimize their visuals.
            Whether you're testing thumbnails, advertisements, or promotional media, the system gathers audience reactions and AI-generated analysis to help you identify which creative performs best.
            You get data-backed confidence before investing in marketing or publishing your content.</p>






    
        {/* why to use */}
        <hr className='border-t border-gray-500 my-10' />
          <h1 className='text-3xl md:text-5xl font-semibold mb-4 text-indigo-300 tracking-wide'>Why Test Your Thumbnails Or Ads?</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            <div className='bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-xl'>
              <h2 className='mb-4 text-lg font-bold text-blue-300'>Improve Click-Through Rates (CTR) Before Publishing</h2>
              <p className='text-gray-300 leading-relaxed'>Different thumbnails or ad creatives often perform very differently.
                By testing multiple options—either through real audience feedback or AI-driven analysis—you can accurately identify which version captures the most attention, clicks, and engagement.
                This removes guesswork and helps you choose the creative that is statistically or intelligently proven to perform better, boosting CTR and overall results before you invest money or publish your content.</p>
            </div>
            <div className='bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-xl'>
              <h2 className='mb-4 text-lg font-bold text-blue-300'>Save Money by Avoiding Poor-Performing Creatives</h2>
              <p className='text-gray-300 leading-relaxed'>Running ads or campaigns with the wrong creative can waste budget quickly.
                Testing helps you identify which thumbnail or ad delivers better conversions, higher retention, and stronger viewer interest.
                This means your marketing budget goes toward the version that actually works, ensuring higher ROI and less wasted spend.</p>
            </div>
          </div>






            {/* How to use */}
            <hr className='border-t border-gray-500 my-10' />
          <h1 className='text-3xl md:text-5xl font-semibold mb-4 text-indigo-300 tracking-wide'>How to Use</h1>
          {/* Step 1 */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
              <span className='text-indigo-400 text-3xl'>🧩</span>
              1. Create Multiple Versions
            </h2>
            <p className='text-gray-300 text-lg ml-2'>
              Start by designing 2–3 variations of your <span className='text-indigo-300'>thumbnails or ads </span>
               to compare which version performs better.
            </p>
            <ul className='list-disc ml-8 text-gray-400 text-lg'>
              <li>Different text placement or font styles</li>
              <li>Alternative background images</li>
              <li>Varied color schemes</li>
              <li>Different layouts or compositions</li>
              <li>Ad Graphics</li>
              <li>Full Video Clips (Content May Differ)</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
              <span className='text-indigo-400 text-3xl'>📝</span>
              2. Add a Title & Short Description
            </h2>
            <p className='text-gray-300 text-lg ml-2'>
              Give context about your
              <span className='text-indigo-300'> creative</span>.
            </p>
            <ul className='list-disc ml-8 text-gray-400 text-lg'>
              <li>What it’s for</li>
              <li>Who it’s targeting</li>
              <li>What the video/thumbnail/ad represents</li>
            </ul>
          </div>

          {/* step3 */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
              <span className='text-indigo-400 text-3xl'>🎯</span>
              3. Test One Variable at a Time
            </h2>
            <p className='text-gray-300 text-lg ml-2'>
              Change only one element across versions to clearly understand what impacts
              <span className='text-indigo-300'> performance</span>.
            </p>
            <ul className='list-disc ml-8 text-gray-400 text-lg'>
              <li>Font size or visibility</li>
              <li>Image composition</li>
              <li>Color palette</li>
              <li>Balance & visual hierarchy</li>
              <li>Comparing different video intros or hooks to see which keeps viewers watching longer</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-white flex items-center gap-2'>
              <span className='text-indigo-400 text-3xl'>📊</span>
              4. Analyze Results
            </h2>
            <p className='text-gray-300 text-lg ml-2'>
              The system evaluates audience reactions or AI predictions to show which
              <span className='text-indigo-300'> thumbnail or ad</span> performs best.
            </p>
            <ul className='list-disc ml-8 text-gray-400 text-lg'>
              <li>Click-through rate (CTR) insights</li>
              <li>Attention & engagement prediction</li>
              <li>Audience retention scoring</li>
              <li>Overall performance comparisons</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutPage
