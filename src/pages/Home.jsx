import React from "react";
import JobCard from "../components/JobCard";
import { useFetchJobsQuery } from "../services/seekerService";
import JobCardSkeleton from "../components/JobCardSkeleton";

const Home = () => {
   const { data: jobsData, error, isLoading } = useFetchJobsQuery();

   if (error) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <div className="container mx-auto px-6 py-12">
               <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                     <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                     <div className="ml-3">
                        <p className="text-red-700 font-medium">Error loading jobs: {error.message}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
         {/* Hero Section */}
         <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative container mx-auto px-6 py-16 lg:py-24">
               <div className="text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                     Find Your Dream Job
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                     Discover thousands of opportunities from top companies worldwide. Your career journey starts here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                        Browse Jobs
                     </button>
                     <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                        Post a Job
                     </button>
                  </div>
               </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-32 h-32 bg-purple-400 opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-300 opacity-20 rounded-full"></div>
         </div>

         {/* Jobs Section */}
         <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Latest Job Opportunities
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our curated list of job openings from leading companies across various industries.
               </p>
               <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 lg:mx-8">
               {isLoading ? (
                  // Show multiple skeleton cards for better loading experience
                  Array.from({ length: 8 }, (_, index) => (
                     <JobCardSkeleton key={index} />
                  ))
               ) : jobsData && jobsData.length > 0 ? (
                  jobsData.map((job) => <JobCard key={job.id} job={job} />)
               ) : (
                  <div className="col-span-full text-center py-16">
                     <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                           </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
                        <p className="text-gray-600">Check back later for new opportunities or adjust your search criteria.</p>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Stats Section */}
         <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                     <div className="text-gray-600">Active Jobs</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                     <div className="text-gray-600">Companies</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
                     <div className="text-gray-600">Job Seekers</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                     <div className="text-gray-600">Success Rate</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;