import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchJobQuery } from "../services/companyService";
import { useGetUserQuery } from "../services/authService";
import UpdateJob from "../components/UpdateJob";
import ApplyJob from "./JobSeeker/ApplyJob";

const JobDetails = () => {
   const { jobId } = useParams();
   const [userRole, setUserRole] = useState("");
   const [showUpdation, setShowUpdation] = useState(false);
   const [isApplying, setIsApplying] = useState(false);

   const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
   const { data, isLoading, isError, error } = useFetchJobQuery(jobId);

   useEffect(() => {
      if (user && data) {
         if (user.role === "job_seeker") {
            setUserRole("seeker");
         } else if (user.role === "admin") {
            setUserRole("admin");
         } else if (user.role === "company") {
            if (user.id === data.company.user.id) {
               setUserRole("owner");
            }
         }
      }
   }, [user, data]);

   if (isLoading || isLoadingUser) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading job details...</p>
            </div>
         </div>
      );
   }

   if (isError) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
            <div className="text-center p-8">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Job</h3>
               <p className="text-gray-600">{error.message}</p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
         {!showUpdation ? (
            <div className="max-w-4xl mx-auto px-4 py-8">
               {/* Job Header */}
               <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="flex-1">
                           <h1 className="text-3xl font-bold text-white mb-2">
                              {data.title}
                           </h1>
                           <div className="flex items-center text-blue-100">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                              </svg>
                              <span className="text-lg font-medium">{data.company.title}</span>
                           </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                           <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                              </svg>
                              {data.salary}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8">
                     {/* Key Information Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                           <div className="flex items-center text-blue-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0V8a2 2 0 002 2h4a2 2 0 002-2V7M5 10a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H5z"></path>
                              </svg>
                              <span className="font-medium">Employment Type</span>
                           </div>
                           <p className="text-gray-800 font-semibold">{data.employment_type}</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                           <div className="flex items-center text-green-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                              </svg>
                              <span className="font-medium">Vacancies</span>
                           </div>
                           <p className="text-gray-800 font-semibold">{data.vacancy} positions</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                           <div className="flex items-center text-purple-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1"></path>
                              </svg>
                              <span className="font-medium">Posted</span>
                           </div>
                           <p className="text-gray-800 font-semibold">
                              {new Date(data.date_posted).toLocaleDateString()}
                           </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                           <div className="flex items-center text-orange-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="font-medium">Deadline</span>
                           </div>
                           <p className="text-gray-800 font-semibold">
                              {new Date(data.last_date_to_apply).toLocaleDateString()}
                           </p>
                        </div>
                     </div>

                     {/* Job Description */}
                     <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                           Job Description
                        </h3>
                        <div className="prose prose-gray max-w-none">
                           <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {data.description}
                           </p>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {userRole === "seeker" && !isApplying && (
                           <button
                              onClick={() => setIsApplying(true)}
                              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                              Apply for this Job
                           </button>
                        )}

                        {(userRole === "admin" || userRole === "owner") && (
                           <button
                              onClick={() => setShowUpdation(true)}
                              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                              Update Job
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <UpdateJob jobDetails={data} toggle={setShowUpdation} />
         )}

         {isApplying && (
            <ApplyJob setIsApplying={setIsApplying} jobId={jobId} />
         )}
      </div>
   );
};

export default JobDetails;