import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { useUpdateApplicationMutation } from "../../services/companyService";

const Applicant = ({ application, setApplication, jobID }) => {
   const [status, setStatus] = useState(application.status);

   const prevStatus = application.status;
   const newStatus = status;

   const { mutate } = useUpdateApplicationMutation(
      jobID,
      prevStatus,
      newStatus
   );

   useEffect(() => {
      setStatus(application.status);
   }, [application]);

   const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
   };

   const handleUpdate = () => {
      mutate({ id: application.id, data: { status: newStatus } });
   };

   return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
         {/* Header Gradient */}
         <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-white">
                        {application.applicant.user.get_full_name}
                     </h3>
                     <p className="text-slate-200 text-sm">Application Review</p>
                  </div>
               </div>
               
               <FaWindowClose
                  onClick={() => setApplication(null)}
                  className="text-red-400 hover:text-red-300 cursor-pointer transform hover:scale-110 transition-all duration-200"
                  size={20}
               />
            </div>
         </div>

         <div className="px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Application Details */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Resume Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                     <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">Resume</h4>
                     </div>
                     <a
                        href={application.resume}
                        target="_blank"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                        rel="noopener noreferrer"
                     >
                        <span className="mr-2">View Resume</span>
                        <MdOpenInNew className="text-sm" />
                     </a>
                  </div>

                  {/* Cover Letter Section */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                     <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                           </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">Cover Letter</h4>
                     </div>
                     <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                        <p className="text-gray-700 leading-relaxed">
                           {application.cover_letter || (
                              <span className="text-gray-500 italic">No cover letter provided.</span>
                           )}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Status Management */}
               <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <div className="text-center mb-6">
                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                     </div>
                     <h4 className="text-lg font-bold text-gray-800">Application Status</h4>
                  </div>

                  <div className="space-y-4">
                     {/* Accept Option */}
                     <label className="group flex items-center p-3 bg-white rounded-lg border-2 border-green-200 hover:border-green-300 cursor-pointer transition-all duration-200 hover:shadow-md">
                        <input
                           id="accepted"
                           type="radio"
                           value="accepted"
                           name="status"
                           className="w-5 h-5 text-green-600 border-green-300 focus:ring-green-500 cursor-pointer"
                           checked={status === "accepted"}
                           onChange={() => handleStatusChange("accepted")}
                        />
                        <div className="ml-3 flex items-center">
                           <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                           <span className="text-green-700 font-medium">Accept</span>
                        </div>
                     </label>

                     {/* Pending Option */}
                     <label className="group flex items-center p-3 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-md">
                        <input
                           id="pending"
                           type="radio"
                           value="pending"
                           name="status"
                           className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500 cursor-pointer"
                           checked={status === "pending"}
                           onChange={() => handleStatusChange("pending")}
                        />
                        <div className="ml-3 flex items-center">
                           <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                           <span className="text-blue-700 font-medium">Pending</span>
                        </div>
                     </label>

                     {/* Reject Option */}
                     <label className="group flex items-center p-3 bg-white rounded-lg border-2 border-red-200 hover:border-red-300 cursor-pointer transition-all duration-200 hover:shadow-md">
                        <input
                           id="rejected"
                           type="radio"
                           value="rejected"
                           name="status"
                           className="w-5 h-5 text-red-600 border-red-300 focus:ring-red-500 cursor-pointer"
                           checked={status === "rejected"}
                           onChange={() => handleStatusChange("rejected")}
                        />
                        <div className="ml-3 flex items-center">
                           <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                           <span className="text-red-700 font-medium">Reject</span>
                        </div>
                     </label>
                  </div>

                  <button
                     onClick={handleUpdate}
                     className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                     Update Status
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Applicant;