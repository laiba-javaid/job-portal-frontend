import React, { useRef, useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserCard = ({ user, onEdit }) => {
   const fileInputRef = useRef(null);
   const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/100");

   const handleImageClick = () => {
      fileInputRef.current.click();
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-6 mt-4 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60"></div>

         <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
               <div className="relative cursor-pointer" onClick={handleImageClick}>
                  <img
                     src={previewImage}
                     alt="User"
                     className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 shadow-lg">
                     <FaCamera className="text-white text-xs" />
                  </div>
                  <input
                     type="file"
                     accept="image/*"
                     ref={fileInputRef}
                     onChange={handleImageChange}
                     className="hidden"
                  />
               </div>

               <div className="flex-1 w-full">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                     {user.get_full_name}
                  </h1>

                  <div className="space-y-3">
                     <div className="flex items-center text-gray-700 bg-white bg-opacity-70 rounded-lg px-3 py-2 shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                           <FaUser className="text-white text-sm" />
                        </div>
                        <span className="font-medium break-words">{user.username}</span>
                     </div>

                     <div className="flex items-center text-gray-700 bg-white bg-opacity-70 rounded-lg px-3 py-2 shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                           <MdEmail className="text-white text-sm" />
                        </div>
                        <span className="font-medium break-words">{user.email}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center mt-8">
               <button
                  onClick={onEdit}
                  className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
               >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                     </svg>
                     Update User
                  </span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default UserCard;
