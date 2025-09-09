import React, { useState } from "react";
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { GrEdit } from "react-icons/gr";
import { LuTimer } from "react-icons/lu";
import { IoCheckmarkCircle, IoBusinessOutline } from "react-icons/io5";
import { useDeleteExperienceMutation } from "../../services/seekerService";

const Experience = ({ exp, setUpdation }) => {
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const deleteExperienceMutation = useDeleteExperienceMutation();

   const formatDate = (dateString) => {
      const [year, month] = dateString.split("-");
      const date = new Date(year, month - 1);
      return date.toLocaleString("default", {
         month: "short",
         year: "numeric",
      });
   };

   const handleDelete = () => {
      deleteExperienceMutation.mutate(exp.id);
      setShowDeleteConfirm(false);
   };

   const calculateDuration = () => {
      const startDate = new Date(exp.start_date);
      const endDate = exp.is_current ? new Date() : new Date(exp.end_date);
      const diffTime = Math.abs(endDate - startDate);
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      
      if (diffMonths < 12) {
         return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
      } else {
         const years = Math.floor(diffMonths / 12);
         const remainingMonths = diffMonths % 12;
         if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
         }
         return `${years}y ${remainingMonths}m`;
      }
   };

   return (
      <>
         <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300 relative overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {/* Main Content */}
            <div className="ml-4">
               {/* Header with verification badge */}
               <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                     <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                           <IoCheckmarkCircle className="text-blue-600 w-5 h-5" />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                              {exp.job_title}
                           </h3>
                           <div className="flex items-center space-x-2 mt-1">
                              <IoBusinessOutline className="text-gray-500 w-4 h-4" />
                              <span className="text-gray-600 font-medium">{exp.company}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                     <button
                        onClick={() => setUpdation(exp)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        title="Edit Experience"
                     >
                        <GrEdit className="w-4 h-4" />
                     </button>
                     <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                        title="Delete Experience"
                     >
                        <FaRegTrashAlt className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Duration and Status */}
               <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                     <LuTimer className="text-gray-500 w-4 h-4" />
                     <span className="text-gray-600">
                        {formatDate(exp.start_date)} - {exp.is_current ? (
                           <span className="text-emerald-600 font-medium">Present</span>
                        ) : (
                           formatDate(exp.end_date)
                        )}
                     </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                     <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                     <span className="text-gray-500 font-medium">
                        {calculateDuration()}
                     </span>
                  </div>
                  
                  {exp.is_current && (
                     <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-600 text-xs font-medium uppercase tracking-wide">
                           Current
                        </span>
                     </div>
                  )}
               </div>

               {/* Description if available */}
               {exp.description && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-200">
                     <p className="text-gray-700 text-sm leading-relaxed">
                        {exp.description}
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Delete Confirmation Modal */}
         {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                  <div className="p-6">
                     <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-red-100 rounded-full">
                           <FaRegTrashAlt className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold text-gray-800">
                              Delete Experience
                           </h3>
                           <p className="text-gray-600 text-sm">
                              This action cannot be undone
                           </p>
                        </div>
                     </div>
                     
                     <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-gray-700">
                           Are you sure you want to delete your experience at{" "}
                           <span className="font-semibold text-gray-800">{exp.company}</span>{" "}
                           as <span className="font-semibold text-gray-800">{exp.job_title}</span>?
                        </p>
                     </div>
                     
                     <div className="flex space-x-3">
                        <button
                           onClick={() => setShowDeleteConfirm(false)}
                           className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={handleDelete}
                           disabled={deleteExperienceMutation.isLoading}
                           className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                           {deleteExperienceMutation.isLoading ? (
                              <>
                                 <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"></path>
                                 </svg>
                                 Deleting...
                              </>
                           ) : (
                              'Delete'
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Experience;