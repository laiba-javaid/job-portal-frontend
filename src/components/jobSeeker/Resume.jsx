import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRectangleList } from "react-icons/fa6";
import { useDeleteResumeMutation } from "../../services/seekerService";

const Resume = ({ link, title, id }) => {
   const deleteResumeMutation = useDeleteResumeMutation();
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const [isHovered, setIsHovered] = useState(false);

   const handleDelete = () => {
      if (showDeleteConfirm) {
         deleteResumeMutation.mutate(id);
         setShowDeleteConfirm(false);
      } else {
         setShowDeleteConfirm(true);
      }
   };

   const handleCancelDelete = () => {
      setShowDeleteConfirm(false);
   };

   return (
      <div 
         className="group relative bg-white rounded-xl shadow-lg border border-gray-200 p-4 my-3 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02]"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Main Content */}
         <div className="flex items-center justify-between">
            {/* Resume Info */}
            <div className="flex items-center flex-1 min-w-0">
               {/* Icon Container */}
               <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 shadow-md">
                  <FaRectangleList className="text-white text-lg" />
               </div>
               
               {/* Resume Details */}
               <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                     <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {title}
                     </h3>
                     <div className="hidden sm:flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                     </svg>
                     <a
                        href={link}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200 truncate"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        View Resume
                     </a>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
               {/* View Button */}
               <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 text-sm font-medium"
               >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
               </a>

               {/* Delete Button */}
               {!showDeleteConfirm ? (
                  <button
                     onClick={handleDelete}
                     className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-110"
                     title="Delete Resume"
                  >
                     <FaRegTrashAlt className="text-sm" />
                  </button>
               ) : (
                  <div className="flex items-center space-x-2">
                     <button
                        onClick={handleCancelDelete}
                        className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors duration-200"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleDelete}
                        disabled={deleteResumeMutation.isLoading}
                        className="px-3 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center disabled:opacity-50"
                     >
                        {deleteResumeMutation.isLoading ? (
                           <>
                              <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Deleting
                           </>
                        ) : (
                           "Delete"
                        )}
                     </button>
                  </div>
               )}
            </div>
         </div>

         {/* Hover Effect Border */}
         <div className={`absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}></div>

         {/* Loading Overlay */}
         {deleteResumeMutation.isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 rounded-xl flex items-center justify-center">
               <div className="flex items-center space-x-2 text-gray-600">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-medium">Deleting...</span>
               </div>
            </div>
         )}

         {/* Status Indicator (Mobile) */}
         <div className="sm:hidden absolute top-2 right-2">
            <div className="flex items-center space-x-1">
               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
               <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
         </div>
      </div>
   );
};

export default Resume;