import React, { useState, useEffect } from "react";
import { useFetchFilteredJobsQuery } from "../../services/seekerService";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import JobCard from "../../components/JobCard";

const Home = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [minSalary, setMinSalary] = useState("");
   const [maxSalary, setMaxSalary] = useState("");
   const [empType, setEmpType] = useState("");
   const [sortBy, setSortBy] = useState("");
   const [page, setPage] = useState(1);
   const [allData, setAllData] = useState([]);

   // Advanced typing animation states
   const [displayText, setDisplayText] = useState("");
   const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
   const [currentCharIndex, setCurrentCharIndex] = useState(0);
   const [isDeleting, setIsDeleting] = useState(false);
   const [showCursor, setShowCursor] = useState(true);

   // App features and functionalities to cycle through
   const phrases = [
      { text: "Find Your Dream Job", centerWord: "Dream", style: "from-yellow-400 via-orange-500 to-red-500" },
      { text: "Search Smart & Fast", centerWord: "Smart", style: "from-green-400 via-emerald-500 to-teal-500" },

      { text: "Browse All Job Types", centerWord: "Types", style: "from-blue-400 via-indigo-500 to-purple-500" },
      { text: "Connect with Top Companies", centerWord: "Companies", style: "from-cyan-400 via-blue-500 to-indigo-500" },
      { text: "Track Your Applications", centerWord: "Track", style: "from-orange-400 via-red-500 to-pink-500" },
      { text: "Get Instant Job Alerts", centerWord: "Alerts", style: "from-emerald-400 via-green-500 to-teal-500" }
   ];

   const params = {
      search: searchQuery,
      min_salary: minSalary,
      max_salary: maxSalary,
      employment_type: empType,
      ordering: sortBy,
      page,
   };

   const { data, isLoading, error } = useFetchFilteredJobsQuery(params);

   // Advanced typing animation effect
   useEffect(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      const typingSpeed = isDeleting ? 50 : 120;
      const pauseTime = isDeleting ? 1000 : 2000;

      if (!isDeleting && currentCharIndex === currentPhrase.text.length) {
         // Finished typing, pause then start deleting
         setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentCharIndex === 0) {
         // Finished deleting, move to next phrase
         setIsDeleting(false);
         setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
         // Continue typing or deleting
         const timeout = setTimeout(() => {
            setCurrentCharIndex((prev) => 
               isDeleting ? prev - 1 : prev + 1
            );
         }, typingSpeed);

         return () => clearTimeout(timeout);
      }
   }, [currentCharIndex, isDeleting, currentPhraseIndex]);

   // Update display text based on current position
   useEffect(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      setDisplayText(currentPhrase.text.substring(0, currentCharIndex));
   }, [currentCharIndex, currentPhraseIndex]);

   // Cursor blinking effect
   useEffect(() => {
      const cursorInterval = setInterval(() => {
         setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
   }, []);

   // Helper function to render text with special center word styling and proper spacing
   const renderStyledText = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const words = displayText.split(' ');
      
      return words.map((word, index) => {
         const isLastWord = index === words.length - 1;
         const isCenterWord = word === currentPhrase.centerWord || 
                            (word.length > 0 && currentPhrase.centerWord.startsWith(word));
         
         if (isCenterWord && word.length > 0) {
            return (
               <React.Fragment key={index}>
                  {index > 0 && <span className="text-white"> </span>}
                  <span className="relative inline-block">
                     <span 
                        className={`bg-gradient-to-r ${currentPhrase.style} bg-clip-text text-transparent font-black transform scale-110 inline-block animate-pulse`}
                        style={{
                           textShadow: '0 0 30px rgba(255,255,255,0.5)',
                           filter: 'brightness(1.2)'
                        }}
                     >
                        {word}
                     </span>
                     {/* Glowing effect behind center word */}
                     <span 
                        className={`absolute inset-0 bg-gradient-to-r ${currentPhrase.style} opacity-20 blur-md -z-10`}
                        aria-hidden="true"
                     >
                        {word}
                     </span>
                  </span>
               </React.Fragment>
            );
         }
         
         return (
            <React.Fragment key={index}>
               {index > 0 && <span className="text-white"> </span>}
               <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  {word}
               </span>
            </React.Fragment>
         );
      });
   };

   const removeDuplicates = (jobs) => {
      const uniqueJobs = [];
      const jobIds = new Set();

      jobs.forEach((job) => {
         if (!jobIds.has(job.id)) {
            uniqueJobs.push(job);
            jobIds.add(job.id);
         }
      });

      return uniqueJobs;
   };

   useEffect(() => {
      if (data && data.results) {
         if (page === 1) {
            setAllData(removeDuplicates(data.results));
         } else {
            setAllData((prevData) =>
               removeDuplicates([...prevData, ...data.results])
            );
         }
      }
   }, [data, page]);

   if (error) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center">
            <div className="container mx-auto px-6 py-12">
               <div className="bg-white border-l-4 border-red-500 p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
                  <div className="flex items-center">
                     <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                           <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                     </div>
                     <div className="ml-4">
                        <h3 className="text-red-800 font-bold text-lg">Oops! Something went wrong</h3>
                        <p className="text-red-600 mt-1">Error loading jobs: {error.message}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
         {/* Enhanced Professional Hero Section with Advanced Typing */}
         <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            {/* Subtle geometric patterns */}
            <div className="absolute inset-0 opacity-10">
               <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
               <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
               <div className="absolute -bottom-8 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>
            
            {/* Grid overlay for professional look */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative container mx-auto px-6 py-24 lg:py-32">
               <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem] flex items-center justify-center">
                     <span className="flex items-center">
                        {renderStyledText()}
                        <span 
                           className={`inline-block w-1 h-16 md:h-20 lg:h-24 bg-gradient-to-t from-blue-400 to-cyan-300 ml-2 ${
                              showCursor ? 'opacity-100' : 'opacity-0'
                           } transition-opacity duration-100 animate-pulse`}
                        ></span>
                     </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                     Discover thousands of opportunities from top companies worldwide. Your career journey starts here with advanced search and intelligent matching.
                  </p>
                  
                  {/* Professional CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                     <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden">
                        <span className="relative z-10">Explore Jobs</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </button>
                     
                  </div>
               </div>
            </div>
         </div>

         {/* Enhanced Search/Filter Section */}
         <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-6 py-6">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {/* Search Input */}
                  <div className="xl:col-span-2">
                     <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLineCap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                           type="text"
                           placeholder="Search jobs, companies, skills..."
                           value={searchQuery}
                           onChange={(e) => {
                              setSearchQuery(e.target.value);
                              setPage(1);
                           }}
                           className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                              searchQuery 
                                 ? "border-green-400 bg-green-50 shadow-lg" 
                                 : "border-gray-200 hover:border-indigo-300"
                           } focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none`}
                        />
                     </div>
                  </div>

                  {/* Salary Inputs */}
                  <div>
                     <input
                        type="number"
                        placeholder="Min salary"
                        value={minSalary}
                        onChange={(e) => {
                           setMinSalary(e.target.value);
                           setPage(1);
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                           minSalary 
                              ? "border-green-400 bg-green-50 shadow-lg" 
                              : "border-gray-200 hover:border-indigo-300"
                        } focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none`}
                     />
                  </div>

                  <div>
                     <input
                        type="number"
                        placeholder="Max salary"
                        value={maxSalary}
                        onChange={(e) => {
                           setMaxSalary(e.target.value);
                           setPage(1);
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                           maxSalary 
                              ? "border-green-400 bg-green-50 shadow-lg" 
                              : "border-gray-200 hover:border-indigo-300"
                        } focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none`}
                     />
                  </div>

                  {/* Employment Type Select */}
                  <div>
                     <select
                        value={empType}
                        onChange={(e) => {
                           setEmpType(e.target.value);
                           setPage(1);
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                           empType 
                              ? "border-green-400 bg-green-50 shadow-lg" 
                              : "border-gray-200 hover:border-indigo-300"
                        } focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none cursor-pointer`}
                     >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                     </select>
                  </div>

                  {/* Sort By Select */}
                  <div>
                     <select
                        value={sortBy}
                        onChange={(e) => {
                           setSortBy(e.target.value);
                           setPage(1);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl focus:outline-none font-medium cursor-pointer transition-all duration-300"
                     >
                        <option value="">Sort By</option>
                        <option value="salary">💰 Salary (Low to High)</option>
                        <option value="-salary">💎 Salary (High to Low)</option>
                        <option value="date_posted">📅 Date Posted (Oldest)</option>
                        <option value="-date_posted">🆕 Date Posted (Newest)</option>
                     </select>
                  </div>
               </div>

               {/* Active Filters Display */}
               {(searchQuery || minSalary || maxSalary || empType || sortBy) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                     {searchQuery && (
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                           🔍 "{searchQuery}"
                           <button 
                              onClick={() => {setSearchQuery(""); setPage(1);}}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                           >×</button>
                        </span>
                     )}
                     {minSalary && (
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                           Min: ${minSalary}
                           <button 
                              onClick={() => {setMinSalary(""); setPage(1);}}
                              className="ml-2 text-green-600 hover:text-green-800"
                           >×</button>
                        </span>
                     )}
                     {maxSalary && (
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                           Max: ${maxSalary}
                           <button 
                              onClick={() => {setMaxSalary(""); setPage(1);}}
                              className="ml-2 text-green-600 hover:text-green-800"
                           >×</button>
                        </span>
                     )}
                     {empType && (
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                           {empType}
                           <button 
                              onClick={() => {setEmpType(""); setPage(1);}}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                           >×</button>
                        </span>
                     )}
                  </div>
               )}
            </div>
         </div>

         {/* Results Section Header */}
         <div className="container mx-auto px-6 py-8">
            <div className="text-center mb-8">
               <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Latest Job Opportunities"}
               </h2>
               {data && (
                  <p className="text-lg text-gray-600">
                     {data.count ? `${data.count} jobs found` : "Exploring opportunities"} • 
                     <span className="text-indigo-600 font-semibold"> Page {page}</span>
                  </p>
               )}
               <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
               {isLoading && page === 1 && (
                  Array.from({ length: 8 }, (_, index) => (
                     <JobCardSkeleton key={index} />
                  ))
               )}
               
               {allData && allData.length > 0 ? (
                  allData.map((job, index) => (
                     <div 
                        key={job.id} 
                        className="transform hover:scale-105 transition-all duration-300"
                        style={{
                           animationDelay: `${index * 0.1}s`,
                           animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                     >
                        <JobCard job={job} />
                     </div>
                  ))
               ) : !isLoading && (
                  <div className="col-span-full text-center py-20">
                     <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg mx-auto border border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                           </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Jobs Found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search criteria or check back later for new opportunities.</p>
                        <button 
                           onClick={() => {
                              setSearchQuery("");
                              setMinSalary("");
                              setMaxSalary("");
                              setEmpType("");
                              setSortBy("");
                              setPage(1);
                           }}
                           className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                           Clear All Filters
                        </button>
                     </div>
                  </div>
               )}
            </div>

            {/* Load More Button */}
            {data && data.next && (
               <div className="flex justify-center py-12">
                  <button
                     className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                     onClick={() => setPage((prevPage) => prevPage + 1)}
                     disabled={!data.next || isLoading}
                  >
                     <span className="flex items-center">
                        {isLoading ? (
                           <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                           </>
                        ) : (
                           <>
                              Load More Jobs
                              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                           </>
                        )}
                     </span>
                  </button>
               </div>
            )}
         </div>

         {/* Stats Section */}
         <div className="bg-gradient-to-r from-gray-50 to-indigo-50 py-20 mt-16">
            <div className="container mx-auto px-6">
               <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Platform Statistics</h3>
                  <p className="text-gray-600">Join thousands of successful job seekers and employers</p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                     <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        {data?.count || "1000"}+
                     </div>
                     <div className="text-gray-600 font-semibold">Active Jobs</div>
                  </div>
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                     <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">500+</div>
                     <div className="text-gray-600 font-semibold">Companies</div>
                  </div>
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                     <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">50K+</div>
                     <div className="text-gray-600 font-semibold">Job Seekers</div>
                  </div>
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                     <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">95%</div>
                     <div className="text-gray-600 font-semibold">Success Rate</div>
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            @keyframes fadeInUp {
               from {
                  opacity: 0;
                  transform: translateY(30px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
            
            .bg-grid-pattern {
               background-image: 
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
               background-size: 20px 20px;
            }
         `}</style>
      </div>
   );
};

export default Home;