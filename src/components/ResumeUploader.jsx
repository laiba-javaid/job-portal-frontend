import React, { useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";

const ResumeUploader = ({ isResumeNull, onUpload }) => {
   const [uploading, setUploading] = useState(false);
   const [uploadError, setUploadError] = useState("");
   const [dragOver, setDragOver] = useState(false);
   const [uploadSuccess, setUploadSuccess] = useState(false);
   const { setFieldValue } = useFormikContext();

   const handleFileChange = async (file) => {
      if (!file) return;

      const formData = new FormData();
      formData.append("resume", file);

      setUploading(true);
      setUploadError("");

      try {
         const token = localStorage.getItem("access_token");
         const response = await fetch("http://localhost:8000/api/seeker/resume/upload/", {
            method: "POST",
            body: formData,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const contentType = response.headers.get("content-type");
         if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
               const errorData = await response.json();
               throw new Error(errorData.error || "Upload failed");
            } else {
               const text = await response.text();
               throw new Error("Server error: " + text.slice(0, 100));
            }
         }

         const data = await response.json();
         setFieldValue("resume", data.id);
         setUploadSuccess(true);
         onUpload && onUpload(data);
      } catch (err) {
         setUploadError(err.message || "Failed to upload. Try again.");
         console.error("Upload error:", err);
      } finally {
         setUploading(false);
      }
   };

   const handleInputChange = (e) => {
      const file = e.target.files[0];
      handleFileChange(file);
   };

   const handleDragOver = (e) => {
      e.preventDefault();
      setDragOver(true);
   };

   const handleDragLeave = (e) => {
      e.preventDefault();
      setDragOver(false);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.type.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml"))) {
         handleFileChange(file);
      } else {
         setUploadError("Please upload a PDF or Word document.");
      }
   };

   return (
      <div className="mb-6">
         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Upload Resume
         </h3>

         <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
               dragOver
                  ? "border-emerald-400 bg-emerald-50"
                  : uploading
                  ? "border-teal-300 bg-teal-50"
                  : uploadError
                  ? "border-red-300 bg-red-50"
                  : isResumeNull
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
         >
            <input
               type="file"
               id="resume-upload"
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               accept=".pdf,.doc,.docx"
               onChange={handleInputChange}
               disabled={uploading}
            />

            {uploading ? (
               <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                     <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  </div>
                  <p className="text-teal-600 font-medium">Uploading your resume...</p>
                  <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
               </div>
            ) : (
               <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                     uploadError || isResumeNull 
                        ? "bg-red-100"
                        : "bg-gradient-to-r from-emerald-600 to-teal-600"
                  }`}>
                     {uploadError || isResumeNull ? (
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                     ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                     )}
                  </div>
                  
                  <h4 className={`text-lg font-semibold mb-2 ${
                     uploadError || isResumeNull ? "text-red-600" : "text-gray-800"
                  }`}>
                     {uploadError || isResumeNull ? "Upload Required" : "Drop your resume here"}
                  </h4>
                  
                  <p className="text-gray-600 mb-4">
                     or{" "}
                     <span className="text-emerald-600 font-medium cursor-pointer hover:text-emerald-700 transition-colors">
                        click to browse
                     </span>
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                     <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        PDF, DOC, DOCX
                     </div>
                     <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                        Max 5MB
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Error Messages */}
         {isResumeNull && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
               <div className="flex">
                  <div className="flex-shrink-0">
                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div className="ml-3">
                     <h3 className="text-sm font-medium text-red-800">Resume Required</h3>
                     <p className="text-sm text-red-700 mt-1">
                        A resume must be uploaded or selected to proceed with your application.
                     </p>
                  </div>
               </div>
            </div>
         )}

         {uploadError && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
               <div className="flex">
                  <div className="flex-shrink-0">
                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div className="ml-3">
                     <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
                     <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                  </div>
               </div>
            </div>
         )}

         {/* Success State - shows after successful upload */}
         {!uploading && !uploadError && !isResumeNull && (
            <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-lg">
               <div className="flex">
                  <div className="flex-shrink-0">
                     <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <div className="ml-3">
                     <h3 className="text-sm font-medium text-emerald-800">Resume Uploaded Successfully</h3>
                     <p className="text-sm text-emerald-700 mt-1">
                        Your resume has been uploaded and is ready for your application.
                     </p>
                  </div>
               </div>
            </div>
         )}

         {/* Tips Card */}
         <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
               <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                     </svg>
                  </div>
               </div>
               <div>
                  <h4 className="text-sm font-semibold text-gray-800">Resume Tips</h4>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                     <li>• Keep your resume updated and relevant to the position</li>
                     <li>• Use PDF format for best compatibility</li>
                     <li>• Ensure file size is under 5MB</li>
                     <li>• Include your contact information and key skills</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ResumeUploader;