import React, { useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FaLocationDot, FaCalendarDays, FaBuilding, FaCamera } from "react-icons/fa6";

const ProfileCard = ({ initialValues, onEdit, onAddJob }) => {
   const fileInputRef = useRef(null);
   const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/100");

   const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => setLogoUrl(reader.result);
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-2xl p-6 mt-4 relative overflow-hidden">
         {/* Header Background */}
         <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-6 py-8 relative rounded-t-2xl">
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-t-2xl"></div>
            <div className="relative z-10">
               <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Company Logo */}
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                     <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg overflow-hidden">
                        <img
                           src={logoUrl}
                           alt="company_logo"
                           className="w-full h-full rounded-xl object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <FaCamera className="text-white text-xl" />
                        </div>
                     </div>
                     <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaBuilding className="text-white text-sm" />
                     </div>
                     <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                     />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 w-full">
                     <h1 className="text-2xl font-bold text-white mb-3 leading-tight">
                        {initialValues.title || (
                           <span className="text-slate-200 italic">
                              Company name not added yet
                           </span>
                        )}
                     </h1>
                     <div className="space-y-2">
                        <div className="flex items-center text-slate-200">
                           <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                              <FaLocationDot className="text-xs" />
                           </div>
                           <span className="text-sm">
                              {initialValues.location || "Location not specified"}
                           </span>
                        </div>
                        <div className="flex items-center text-slate-200">
                           <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                              <FaCalendarDays className="text-xs" />
                           </div>
                           <span className="text-sm">
                              {initialValues.established_date
                                 ? `Established ${new Date(initialValues.established_date).getFullYear()}`
                                 : "Establishment date not set"}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Section */}
         <div className="p-6">
            {/* Company Description */}
            <div className="mb-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-slate-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Company
               </h3>
               <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-slate-500">
                  <p className="text-gray-700 leading-relaxed">
                     {initialValues.description || (
                        <span className="italic text-gray-500">
                           Company description not added yet. Add a compelling description to attract potential candidates.
                        </span>
                     )}
                  </p>
               </div>
            </div>

            {/* Website Section */}
            <div className="mb-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-slate-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9m9 9a9 9 0 01-9 9m9-9H3m9 9v-9" />
                  </svg>
                  Website
               </h3>
               <div className="flex items-center bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                     <FaGlobe className="text-slate-600" />
                  </div>
                  {initialValues.website ? (
                     <a
                        href={initialValues.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                     >
                        Visit Company Website
                        <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                     </a>
                  ) : (
                     <span className="italic text-gray-500">Website URL not added yet</span>
                  )}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
               <button
                  onClick={onAddJob}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg flex items-center justify-center"
               >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Post New Job
               </button>
               <button
                  onClick={onEdit}
                  className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-6 rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 shadow-lg flex items-center justify-center"
               >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Update Profile
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProfileCard;
