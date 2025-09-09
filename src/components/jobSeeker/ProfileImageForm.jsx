import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useUpdateProfileMutation } from "../../services/seekerService";

const ProfileImageForm = ({ setIsAddingPicture }) => {
   const { mutate, isLoading, isError } = useUpdateProfileMutation();
   const [previewUrl, setPreviewUrl] = useState(null);
   
   const initialValues = {
      profile_photo: null,
   };

   const validationSchema = Yup.object({
      profile_photo: Yup.mixed()
         .nullable()
         .required("Profile photo is required")
         .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 2 * 1024 * 1024;
         })
         .test("fileFormat", "Unsupported Format", (value) => {
            return value && ["image/jpeg", "image/png"].includes(value.type);
         }),
   });

   const handleSubmit = (values, { setSubmitting }) => {
      mutate(values, {
         onSuccess: () => {
            setIsAddingPicture(false);
            setSubmitting(false);
         },
         onError: (err) => {
            console.log(err);
            setSubmitting(false);
         },
      });
   };

   const handleFileChange = (event, setFieldValue) => {
      const file = event.target.files[0];
      if (file) {
         setFieldValue("profile_photo", file);
         // Create preview URL
         const url = URL.createObjectURL(file);
         setPreviewUrl(url);
      }
   };

   return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
         {/* Close Button */}
         <button
            onClick={() => setIsAddingPicture(false)}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
         >
            <IoMdCloseCircleOutline
               size={20}
               className="text-red-500 hover:text-red-600"
            />
         </button>

         {/* Header Section */}
         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-center">
               <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
               </div>
               <div className="text-center">
                  <h2 className="text-xl font-bold text-white">
                     Update Profile Photo
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                     Upload a professional photo
                  </p>
               </div>
            </div>
         </div>

         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ setFieldValue, values, isSubmitting, errors, touched }) => (
               <Form className="px-6 py-6">
                  {/* Upload Section */}
                  <div className="mb-6">
                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose Photo
                     </h3>
                     
                     {/* Preview Area */}
                     {previewUrl && (
                        <div className="mb-6 flex justify-center">
                           <div className="relative">
                              <img
                                 src={previewUrl}
                                 alt="Preview"
                                 className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                              />
                              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* File Input */}
                     <div className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                           <input
                              type="file"
                              name="profile_photo"
                              accept="image/jpeg, image/png"
                              onChange={(event) => handleFileChange(event, setFieldValue)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                           />
                           
                           <div className="text-center">
                              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                 </svg>
                              </div>
                              
                              <p className="text-gray-600 font-medium mb-1">
                                 Click to upload or drag and drop
                              </p>
                              <p className="text-sm text-gray-500">
                                 PNG or JPG (max. 2MB)
                              </p>
                           </div>
                        </div>
                        
                        {/* Selected File Info */}
                        {values.profile_photo && (
                           <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center">
                                 <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                                 <div>
                                    <p className="text-sm font-medium text-gray-800">
                                       {values.profile_photo.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       {(values.profile_photo.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                     
                     <ErrorMessage
                        name="profile_photo"
                        component="div"
                        className="mt-3 text-red-600 text-sm flex items-center justify-center"
                     >
                        {(msg) => (
                           <div className="flex items-center bg-red-50 border border-red-200 rounded-lg p-2">
                              <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {msg}
                           </div>
                        )}
                     </ErrorMessage>
                  </div>

                  {/* Error Display */}
                  {isError && (
                     <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                        <div className="flex">
                           <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                           </div>
                           <div className="ml-3">
                              <p className="text-sm text-red-700">
                                 There was an error uploading your photo. Please try again.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-gray-200">
                     <button
                        type="button"
                        onClick={() => setIsAddingPicture(false)}
                        className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-105"
                     >
                        Cancel
                     </button>
                     
                     <button
                        type="submit"
                        disabled={isSubmitting || isLoading || !values.profile_photo}
                        className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                     >
                        {isSubmitting || isLoading ? (
                           <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Uploading...
                           </>
                        ) : (
                           <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Upload Photo
                           </>
                        )}
                     </button>
                  </div>
               </Form>
            )}
         </Formik>

         {/* Tips Card */}
         <div className="hidden lg:block absolute -right-72 top-4 w-64">
            <div className="bg-white rounded-xl shadow-xl p-5 border border-blue-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Photo Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Use a professional headshot</li>
                        <li>• Good lighting is essential</li>
                        <li>• Face should be clearly visible</li>
                        <li>• Avoid filters or heavy editing</li>
                        <li>• Keep file size under 2MB</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileImageForm;