import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const JobCard = ({ btn_text = "Apply", job = null }) => {
   const excerpt = (text, length) => {
      if (text.length <= length) return text;
      return text.substring(0, length) + "...";
   };
   
   let btnLink = `/job/${job.id}`;

   return (
      <div className="w-full mx-auto group">
         <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 transform hover:scale-[1.02] relative backdrop-blur-sm aspect-square flex flex-col h-80 w-80">
            
            {/* Employment Type Badge */}
            <div className="absolute top-3 right-3 z-10">
               <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
                  {job.employment_type}
               </span>
            </div>

            {/* Header Section - Reduced */}
            <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-3 flex-shrink-0">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
               <div className="relative pr-12">
                  <h2 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                     {job.title}
                  </h2>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-1 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
               </div>
            </div>

            {/* Main Content - Flexible */}
            <div className="flex-1 flex flex-col p-3 space-y-2">
               
               {/* Company Info */}
               <div className="flex items-center group/company hover:bg-emerald-50 -mx-1 px-1 py-1 rounded-lg transition-colors duration-200 flex-shrink-0">
                  <div className="bg-emerald-100 p-1 rounded-full mr-2 group-hover/company:bg-emerald-200 transition-colors duration-200">
                     <FaRegBuilding className="text-emerald-600 text-xs" />
                  </div>
                  <p className="text-gray-700 font-semibold text-sm truncate">{job.company.title}</p>
               </div>

               {/* Compact Details Grid */}
               <div className="grid grid-cols-2 gap-1 flex-shrink-0">
                  {/* Salary */}
                  <div className="flex items-center group/salary hover:bg-amber-50 p-1 rounded-lg transition-colors duration-200">
                     <div className="bg-amber-100 p-1 rounded-full mr-1 group-hover/salary:bg-amber-200 transition-colors duration-200">
                        <GiMoneyStack className="text-amber-600 text-xs" />
                     </div>
                     <div className="min-w-0">
                        <p className="text-gray-700 font-medium text-xs truncate">
                           {job.salary || "Not disclosed"}
                        </p>
                     </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center group/location hover:bg-blue-50 p-1 rounded-lg transition-colors duration-200">
                     <div className="bg-blue-100 p-1 rounded-full mr-1 group-hover/location:bg-blue-200 transition-colors duration-200">
                        <FaLocationDot className="text-blue-600 text-xs" />
                     </div>
                     <div className="min-w-0">
                        <p className="text-gray-700 font-medium text-xs truncate">{job.company.location}</p>
                     </div>
                  </div>
               </div>

               {/* Application Deadline */}
               <div className="flex items-center group/deadline hover:bg-red-50 -mx-1 px-1 py-1 rounded-lg transition-colors duration-200 flex-shrink-0">
                  <div className="bg-red-100 p-1 rounded-full mr-2 group-hover/deadline:bg-red-200 transition-colors duration-200">
                     <MdCalendarMonth className="text-red-600 text-xs" />
                  </div>
                  <div className="min-w-0">
                     <p className="text-gray-700 font-medium text-xs truncate">
                        {job.last_date_to_apply || "Not disclosed"}
                     </p>
                  </div>
               </div>

               {/* Description Section - Flexible */}
               <div className="flex-1 min-h-0">
                  <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 h-full flex flex-col">
                     <h3 className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide flex-shrink-0">Description</h3>
                     <div className="flex-1 overflow-hidden">
                        <p className="text-gray-700 leading-relaxed text-xs line-clamp-4">
                           {excerpt(job.description, 80)}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Button - Fixed */}
            <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex-shrink-0">
               <Link
                  to={btnLink}
                  className="group/btn relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50 overflow-hidden w-full text-center block"
               >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  
                  {/* Button content */}
                  <span className="relative flex items-center justify-center text-sm">
                     {btn_text}
                     <svg 
                        className="w-3 h-3 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                  </span>
               </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                     <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                     </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" className="text-emerald-500" />
               </svg>
            </div>
         </div>

         <style jsx>{`
            .line-clamp-2 {
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               overflow: hidden;
            }
            
            .line-clamp-4 {
               display: -webkit-box;
               -webkit-line-clamp: 4;
               -webkit-box-orient: vertical;
               overflow: hidden;
            }
         `}</style>
      </div>
   );
};

export default JobCard;