import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFilteredApplicationsQuery } from "../../services/companyService";
import { useParams } from "react-router-dom";
import Applicant from "./Applicant";
import ApplicantSkeleton from "../../components/company/skeletons/ApplicantSkeleton";

const ApplicantsList = () => {
   const { jobID } = useParams();
   const [application, setApplication] = useState();
   const [showDropdown, setShowDropdown] = useState(false);
   const [filterStatus, setFilterStatus] = useState("all");
   const { data, isLoading, error } = useFilteredApplicationsQuery(
      jobID,
      filterStatus
   );

   if (error) return <p>Error: {error.message}</p>;

   const formattedDate = (appliedAt) => {
      const date = new Date(appliedAt);
      const day = date.getUTCDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getUTCFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      return formattedDate;
   };

   const handleFilter = (status) => {
      setFilterStatus(status);
      setShowDropdown(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
         <div className="lg:w-4/5 xl:w-3/5 mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
               </div>
               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  Applications Dashboard
               </h1>
               <p className="text-gray-600">Manage and review job applications</p>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
               {/* Table Header */}
               <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Application Records</h2>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                        <tr>
                           <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              #
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Applicant
                           </th>
                           <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Application Date
                           </th>
                           <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              <div className="flex justify-center items-center space-x-2">
                                 <span>Status</span>
                                 <div className="relative">
                                    <button
                                       className="flex items-center space-x-1 px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                       onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                       </svg>
                                    </button>
                                    {showDropdown && (
                                       <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                                          <div className="py-1">
                                             {["all", "accepted", "rejected", "pending"].map((status) => (
                                                <button
                                                   key={status}
                                                   className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left capitalize transition-colors duration-200"
                                                   onClick={() => handleFilter(status)}
                                                >
                                                   {status}
                                                </button>
                                             ))}
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </th>
                           <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                           <>
                              {[...Array(5)].map((_, index) => (
                                 <tr key={index} className="hover:bg-gray-50">
                                    {Array(5)
                                       .fill()
                                       .map((_, idx) => (
                                          <td key={idx} className="px-6 py-4">
                                             <Skeleton height={20} />
                                          </td>
                                       ))}
                                 </tr>
                              ))}
                           </>
                        ) : data?.length === 0 ? (
                           <tr>
                              <td
                                 className="px-6 py-12 text-center"
                                 colSpan={5}
                              >
                                 <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                       <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                       </svg>
                                    </div>
                                    <p className="text-amber-600 font-semibold text-lg">No Applications Found</p>
                                    <p className="text-gray-500 mt-1">There are no applications to display for the selected filter.</p>
                                 </div>
                              </td>
                           </tr>
                        ) : (
                           data.map((application, index) => (
                              <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-200">
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                       <span className="text-white font-semibold text-sm">{index + 1}</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                       <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mr-3">
                                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                       </div>
                                       <div>
                                          <div className="text-sm font-semibold text-gray-900">
                                             {application.applicant.user.get_full_name}
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                       {formattedDate(application.applied_at)}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {{
                                       pending: (
                                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200">
                                             <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                             Pending
                                          </span>
                                       ),
                                       accepted: (
                                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                                             <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                             Accepted
                                          </span>
                                       ),
                                       rejected: (
                                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200">
                                             <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                             Rejected
                                          </span>
                                       ),
                                    }[application.status] || ""}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                       onClick={() => setApplication(application)}
                                       className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                       </svg>
                                       View
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Application Detail Modal */}
            <div className="mt-8">
               {application ? (
                  <Applicant
                     application={application}
                     setApplication={setApplication}
                     jobID={jobID}
                  />
               ) : (
                  <ApplicantSkeleton />
               )}
            </div>
         </div>
      </div>
   );
};

export default ApplicantsList;