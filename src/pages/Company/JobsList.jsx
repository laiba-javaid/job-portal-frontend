import React from "react";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { useFetchJobsbyCompanyQuery } from "../../services/companyService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const JobsList = () => {
   const { data, isLoading, error } = useFetchJobsbyCompanyQuery();

   if (error) {
      console.log(error);
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
         {/* Header Section */}
         <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-12 px-6 shadow-lg">
            <div className="max-w-4xl mx-auto text-center">
               <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <PiSuitcaseSimpleDuotone size={32} className="text-white" />
               </div>
               <h1 className="text-4xl font-bold mb-4">Job Management Center</h1>
               <p className="text-blue-100 text-lg">Monitor and manage your job postings and applications</p>
            </div>
         </div>

         <div className="p-6 max-w-4xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mt-8">
               {/* Card Header */}
               <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                           </svg>
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-white">My Job Postings</h2>
                           <p className="text-emerald-100 mt-1">Select a job to view and manage applications</p>
                        </div>
                     </div>
                     {!isLoading && data && (
                        <div className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full">
                           <span className="text-sm font-semibold">{data.length} Active Jobs</span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Jobs List Content */}
               <div className="p-8">
                  {isLoading ? (
                     <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                           <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                    <div className="bg-emerald-100 rounded-full p-3">
                                       <PiSuitcaseSimpleDuotone size={24} className="text-emerald-600" />
                                    </div>
                                    <div className="space-y-2">
                                       <Skeleton width={250} height={20} />
                                       <Skeleton width={150} height={16} />
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <Skeleton width={80} height={36} />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : data && data.length > 0 ? (
                     <div className="space-y-4">
                        {data.map((job, index) => (
                           <div 
                              key={job.id} 
                              className="group bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                           >
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
                                       <PiSuitcaseSimpleDuotone size={24} className="text-white" />
                                    </div>
                                    <div>
                                       <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                                          {job.title}
                                       </h3>
                                       <div className="flex items-center space-x-4 mt-1">
                                          <span className="text-sm text-gray-600">Job #{index + 1}</span>
                                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                             Active
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <Link
                                       to={`applications/${job.id}`}
                                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    >
                                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                       </svg>
                                       View Applications
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-16">
                        <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                           <PiSuitcaseSimpleDuotone size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">No Job Postings Yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                           You haven't created any job postings yet. Start by posting your first job to attract talented candidates.
                        </p>
                        <Link
                           to="/company/profile"
                           className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                        >
                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                           </svg>
                           Create Your First Job
                        </Link>
                     </div>
                  )}
               </div>

               {/* Footer with Stats */}
               {!isLoading && data && data.length > 0 && (
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-4 border-t border-gray-200">
                     <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-6">
                           <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                              <span className="text-gray-600">Active Postings: {data.length}</span>
                           </div>
                        </div>
                        <div className="text-gray-500">
                           Click on any job to view and manage applications
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default JobsList;