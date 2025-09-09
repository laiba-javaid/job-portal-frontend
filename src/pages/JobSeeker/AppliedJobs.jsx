import React from "react";
import { useFetchApplicationsQuery } from "../../services/seekerService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AppliedJobs = () => {
   const { data, isLoading, error } = useFetchApplicationsQuery();

   if (error) return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
         <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="flex items-center space-x-3">
               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <div>
                  <h3 className="text-lg font-semibold text-red-800">Error Loading Applications</h3>
                  <p className="text-red-600">{error.message}</p>
               </div>
            </div>
         </div>
      </div>
   );

   const formattedDate = (appliedAt) => {
      const date = new Date(appliedAt);
      const day = date.getUTCDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getUTCFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      return formattedDate;
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
         <div className="lg:w-4/5 xl:w-3/4 2xl:w-2/3 mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
               </div>
               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  Applied Jobs
               </h1>
               <p className="text-gray-600 text-lg">Track your job applications and their status</p>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
               {/* Table Header */}
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 text-white font-semibold">
                     <div className="col-span-1 text-center">#</div>
                     <div className="col-span-4">Job Title</div>
                     <div className="col-span-3 text-center">Company</div>
                     <div className="col-span-2 text-center">Applied On</div>
                     <div className="col-span-2 text-center">Status</div>
                  </div>
               </div>

               {/* Table Body */}
               <div className="divide-y divide-gray-100">
                  {isLoading ? (
                     <>
                        {[...Array(5)].map((_, index) => (
                           <div key={index} className="px-6 py-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                 <div className="col-span-1">
                                    <Skeleton circle width={24} height={24} />
                                 </div>
                                 <div className="col-span-4">
                                    <Skeleton height={20} />
                                    <Skeleton height={16} width="60%" className="mt-1" />
                                 </div>
                                 <div className="col-span-3">
                                    <Skeleton height={20} />
                                 </div>
                                 <div className="col-span-2">
                                    <Skeleton height={20} />
                                 </div>
                                 <div className="col-span-2">
                                    <Skeleton height={28} width={80} />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </>
                  ) : data?.length > 0 ? (
                     data.map((job, index) => (
                        <div key={job.id} className="px-6 py-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
                           <div className="grid grid-cols-12 gap-4 items-center">
                              <div className="col-span-1 text-center">
                                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {index + 1}
                                 </div>
                              </div>
                              <div className="col-span-4">
                                 <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
                                    {job.job.title}
                                 </h3>
                                 <p className="text-gray-500 text-sm mt-1">Position Applied</p>
                              </div>
                              <div className="col-span-3 text-center">
                                 <div className="flex items-center justify-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                       <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11" />
                                       </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">{job.job.company.title}</span>
                                 </div>
                              </div>
                              <div className="col-span-2 text-center">
                                 <div className="flex flex-col items-center">
                                    <span className="font-medium text-gray-900">{formattedDate(job.applied_at)}</span>
                                    <span className="text-xs text-gray-500 mt-1">Application Date</span>
                                 </div>
                              </div>
                              <div className="col-span-2 text-center">
                                 {{
                                    pending: (
                                       <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200 shadow-sm">
                                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                                          Pending
                                       </span>
                                    ),
                                    accepted: (
                                       <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                          Accepted
                                       </span>
                                    ),
                                    rejected: (
                                       <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200 shadow-sm">
                                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                          Rejected
                                       </span>
                                    ),
                                 }[job.status] || ""}
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center space-y-4">
                           <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                           </div>
                           <div>
                              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
                              <p className="text-gray-500 mb-4">You haven't applied to any jobs yet. Start your job search!</p>
                              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                 Browse Jobs
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Statistics Cards */}
            {data?.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Total Applications</p>
                           <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Pending</p>
                           <p className="text-3xl font-bold text-yellow-600">{data.filter(job => job.status === 'pending').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Accepted</p>
                           <p className="text-3xl font-bold text-green-600">{data.filter(job => job.status === 'accepted').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default AppliedJobs;