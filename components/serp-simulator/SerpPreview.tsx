import React from 'react';

interface SerpPreviewProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  viewMode: 'desktop' | 'mobile';
  titleLimit: number;
  descriptionLimit: number;
}

const SerpPreview: React.FC<SerpPreviewProps> = ({
  title,
  description,
  url,
  siteName,
  viewMode,
  titleLimit,
  descriptionLimit
}) => {
  const isDesktop = viewMode === 'desktop';

  // Google truncates with "...", so we account for that in length
  const truncatedTitle = title.length > titleLimit ? `${title.substring(0, titleLimit)}...` : title;
  const truncatedDescription = description.length > descriptionLimit ? `${description.substring(0, descriptionLimit)}...` : description;

  const Favicon = () => (
    <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 mr-2 flex-shrink-0"></div>
  );

  return (
    <div className={`font-sans bg-white p-4 ${isDesktop ? 'max-w-2xl' : 'max-w-md mx-auto'} w-full border-4 border-black shadow-[8px_8px_0_#551EFD]`}>
      <div className={isDesktop ? 'px-8 py-4' : 'px-2 py-2'}>
        {isDesktop && (
            <div className="flex items-center mb-6 gap-4">
                <div className="w-24 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 60">
                        <path d="M32.377 26.446h-12.52v3.715h8.88c-.44 5.2-4.773 7.432-8.865 7.432a9.76 9.76 0 0 1-9.802-9.891c0-5.624 4.354-9.954 9.814-9.954 4.212 0 6.694 2.685 6.694 2.685l2.6-2.694s-3.34-3.717-9.43-3.717c-7.755 0-13.754 6.545-13.754 13.614 0 6.927 5.643 13.682 13.95 13.682 7.307 0 12.656-5.006 12.656-12.408 0-1.562-.227-2.464-.227-2.464z" fill="#4885ed"/>
                        <use xlinkHref="#A" fill="#db3236"/>
                        <use xlinkHref="#A" x="19.181" fill="#f4c20d"/>
                        <path d="M80.628 23.765c-4.716 0-8.422 4.13-8.422 8.766 0 5.28 4.297 8.782 8.34 8.782 2.5 0 3.83-.993 4.8-2.132v1.73c0 3.027-1.838 4.84-4.612 4.84-2.68 0-4.024-1.993-4.5-3.123l-3.372 1.4c1.196 2.53 3.604 5.167 7.9 5.167 4.7 0 8.262-2.953 8.262-9.147V24.292H85.36v1.486c-1.13-1.22-2.678-2.013-4.73-2.013zm.34 3.44c2.312 0 4.686 1.974 4.686 5.345 0 3.427-2.37 5.315-4.737 5.315-2.514 0-4.853-2.04-4.853-5.283 0-3.368 2.43-5.378 4.904-5.378z" fill="#4885ed"/>
                        <path d="M105.4 23.744c-4.448 0-8.183 3.54-8.183 8.76 0 5.526 4.163 8.803 8.6 8.803 3.712 0 6-2.03 7.35-3.85l-3.033-2.018c-.787 1.22-2.103 2.415-4.298 2.415-2.466 0-3.6-1.35-4.303-2.66l11.763-4.88-.6-1.43c-1.136-2.8-3.787-5.14-7.295-5.14zm.153 3.374c1.603 0 2.756.852 3.246 1.874l-7.856 3.283c-.34-2.542 2.07-5.157 4.6-5.157z" fill="#db3236"/>
                        <path d="M91.6 40.787h3.864V14.93H91.6z" fill="#3cba54"/>
                        <defs><path id="A" d="M42.634 23.755c-5.138 0-8.82 4.017-8.82 8.7 0 4.754 3.57 8.845 8.88 8.845 4.806 0 8.743-3.673 8.743-8.743 0-5.8-4.58-8.803-8.803-8.803zm.05 3.446c2.526 0 4.92 2.043 4.92 5.334 0 3.22-2.384 5.322-4.932 5.322-2.8 0-5-2.242-5-5.348 0-3.04 2.18-5.308 5.02-5.308z"/></defs>
                    </svg>
                </div>
                <div className="flex-grow">
                    <div className="relative">
                        <input 
                            type="text" 
                            defaultValue="laysander tools serp simulator" 
                            className="w-full pl-10 pr-12 py-2 border-2 border-black bg-white"
                        />
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>
        )}
        
        {/* Result Card */}
        <div className="my-4">
            <div className="flex items-center">
                 {!isDesktop && <Favicon />}
                <div>
                    <span className={`block font-normal ${isDesktop ? 'text-sm' : 'text-xs'}`} style={{ color: '#202124' }}>
                        {siteName}
                    </span>
                    <span className={`block font-normal ${isDesktop ? 'text-xs' : 'text-xs'}`} style={{ color: '#202124' }}>
                        {url.replace(/^https?:\/\//, '').split('/')[0]}
                    </span>
                </div>
                <span className="ml-auto text-gray-500 text-xl">⋮</span>
            </div>

            <h3 className={`font-medium mt-1 mb-1 ${isDesktop ? 'text-xl' : 'text-lg'}`}>
                <span style={{ color: '#1a0dab' }} className="hover:underline">
                    {truncatedTitle || "Your Title Here"}
                </span>
            </h3>

            <p className={`font-normal ${isDesktop ? 'text-sm' : 'text-sm'}`} style={{ color: '#4d5156', lineHeight: '1.5' }}>
                {truncatedDescription || "Your meta description will appear here. Make it compelling and relevant to attract more clicks from users searching on Google."}
            </p>
        </div>
        
         {/* Fake second result for context */}
         <div className="my-4 opacity-60">
            <div className="flex items-center">
                {!isDesktop && <Favicon />}
                <div>
                    <span className={`block font-normal ${isDesktop ? 'text-sm' : 'text-xs'}`} style={{ color: '#202124' }}>Wikipedia</span>
                    <span className={`block font-normal ${isDesktop ? 'text-xs' : 'text-xs'}`} style={{ color: '#202124' }}>en.wikipedia.org</span>
                </div>
                <span className="ml-auto text-gray-500 text-xl">⋮</span>
            </div>
            <h3 className={`font-medium mt-1 mb-1 ${isDesktop ? 'text-xl' : 'text-lg'}`}>
                <span style={{ color: '#1a0dab' }} className="hover:underline">Search engine results page - Wikipedia</span>
            </h3>
            <p className={`font-normal ${isDesktop ? 'text-sm' : 'text-sm'}`} style={{ color: '#4d5156', lineHeight: '1.5' }}>
                A search engine results page (SERP) is the page displayed by a web search engine in response to a query by a searcher. The main component of the SERP is...
            </p>
        </div>
      </div>
    </div>
  );
};

export default SerpPreview;