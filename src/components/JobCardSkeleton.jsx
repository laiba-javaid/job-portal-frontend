import React from "react";

const JobCardSkeleton = () => {
   return Array(6)
      .fill()
      .map((_, index) => {
         return (
            <div className="w-full mx-auto group" key={index}>
               <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 transform hover:scale-[1.02] relative backdrop-blur-sm aspect-square flex flex-col h-80 w-80">
                  
                  {/* Employment Type Badge */}
                  <div className="absolute top-3 right-3 z-10">
                     <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-lg">
                        <div className="w-16 h-3 bg-white/30 rounded animate-pulse"></div>
                     </div>
                  </div>

                  {/* Header Section - Reduced */}
                  <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-3 flex-shrink-0">
                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
                     <div className="relative pr-12">
                        <div className="mb-2">
                           <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-1"></div>
                           <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                     </div>
                  </div>

                  {/* Main Content - Flexible */}
                  <div className="flex-1 flex flex-col p-3 space-y-2">
                     
                     {/* Company Info */}
                     <div className="flex items-center group/company hover:bg-emerald-50 -mx-1 px-1 py-1 rounded-lg transition-colors duration-200 flex-shrink-0">
                        <div className="bg-emerald-100 p-1 rounded-full mr-2 group-hover/company:bg-emerald-200 transition-colors duration-200">
                           {/* Building Icon */}
                           <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m7 0v-4a2 2 0 012-2v2a2 2 0 012 2v4"/>
                           </svg>
                        </div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                     </div>

                     {/* Compact Details Grid */}
                     <div className="grid grid-cols-2 gap-1 flex-shrink-0">
                        {/* Salary */}
                        <div className="flex items-center group/salary hover:bg-amber-50 p-1 rounded-lg transition-colors duration-200">
                           <div className="bg-amber-100 p-1 rounded-full mr-1 group-hover/salary:bg-amber-200 transition-colors duration-200">
                              {/* Money Icon */}
                              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                              </svg>
                           </div>
                           <div className="min-w-0 flex-1">
                              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                           </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center group/location hover:bg-blue-50 p-1 rounded-lg transition-colors duration-200">
                           <div className="bg-blue-100 p-1 rounded-full mr-1 group-hover/location:bg-blue-200 transition-colors duration-200">
                              {/* Location Icon */}
                              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                           </div>
                           <div className="min-w-0 flex-1">
                              <div className="w-14 h-3 bg-gray-200 rounded animate-pulse"></div>
                           </div>
                        </div>
                     </div>

                     {/* Application Deadline */}
                     <div className="flex items-center group/deadline hover:bg-red-50 -mx-1 px-1 py-1 rounded-lg transition-colors duration-200 flex-shrink-0">
                        <div className="bg-red-100 p-1 rounded-full mr-2 group-hover/deadline:bg-red-200 transition-colors duration-200">
                           {/* Calendar Icon */}
                           <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"/>
                           </svg>
                        </div>
                        <div className="min-w-0">
                           <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                     </div>

                     {/* Description Section - Flexible */}
                     <div className="flex-1 min-h-0">
                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 h-full flex flex-col">
                           <h3 className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide flex-shrink-0">Description</h3>
                           <div className="flex-1 overflow-hidden space-y-1">
                              <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-11/12 h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-4/5 h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Footer Button - Fixed */}
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex-shrink-0">
                     <div className="group/btn relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg overflow-hidden w-full text-center flex items-center justify-center opacity-50 cursor-not-allowed">
                        {/* Loading spinner */}
                        <svg
                           className="animate-spin h-4 w-4 text-white mr-2"
                           viewBox="0 0 24 24"
                        >
                           <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                           ></circle>
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                           ></path>
                        </svg>
                        <span className="text-sm">Loading...</span>
                     </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                     <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                        <defs>
                           <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                           </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${index})`} className="text-emerald-500" />
                     </svg>
                  </div>
               </div>

               <style jsx>{`
                  .line-clamp-2 {
                     display: -webkit-box;
                     -webkit-line-clamp: 2;
                     -webkit-box-orient: vertical;
                     overflow: hidden;
                  }
                  
                  .line-clamp-4 {
                     display: -webkit-box;
                     -webkit-line-clamp: 4;
                     -webkit-box-orient: vertical;
                     overflow: hidden;
                  }
               `}</style>
            </div>
         );
      });
};

export default JobCardSkeleton;