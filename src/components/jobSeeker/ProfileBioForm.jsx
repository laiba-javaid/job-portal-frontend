import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUpdateProfileMutation } from "../../services/seekerService";

const ProfileBioForm = ({ setIsAddingBio, profile = null }) => {
   const { mutate, isLoading, isError } = useUpdateProfileMutation();
   
   const initialValues = {
      bio: profile.bio || "",
   };

   const validationSchema = Yup.object({
      bio: Yup.string().max(100, "Bio must be 100 characters or less"),
   });

   const handleSubmit = (values, { setSubmitting }) => {
      mutate(values, {
         onSuccess: () => {
            setIsAddingBio(false);
            setSubmitting(false);
         },
         onError: (err) => {
            console.log(err);
            setSubmitting(false);
         },
      });
   };

   return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
         {/* Header Section */}
         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center">
               <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </div>
               <div>
                  <h2 className="text-xl font-bold text-white">
                     Update Bio
                  </h2>
                  <p className="text-indigo-100 text-sm mt-1">
                     Share your professional story in a few words
                  </p>
               </div>
            </div>
         </div>

         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, isSubmitting, errors, touched }) => (
               <Form className="px-6 py-6">
                  {/* Bio Section */}
                  <div className="mb-6">
                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Professional Bio
                     </h3>
                     
                     <div className="relative">
                        <Field
                           as="textarea"
                           name="bio"
                           rows="4"
                           placeholder="Write a brief professional bio that showcases your expertise and personality..."
                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none bg-gray-50 hover:bg-white hover:border-gray-300 text-gray-800 placeholder-gray-500"
                        />
                        
                        {/* Character Count */}
                        <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                           {values.bio?.length || 0}/100
                        </div>
                     </div>
                     
                     <ErrorMessage
                        name="bio"
                        component="div"
                        className="mt-2 text-red-600 text-sm flex items-center"
                     >
                        {(msg) => (
                           <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                 There was an error updating your bio. Please try again.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                     <button
                        type="button"
                        onClick={() => setIsAddingBio(false)}
                        className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-105"
                     >
                        Cancel
                     </button>
                     
                     <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                     >
                        {isSubmitting || isLoading ? (
                           <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                           </>
                        ) : (
                           <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Update Bio
                           </>
                        )}
                     </button>
                  </div>
               </Form>
            )}
         </Formik>

         {/* Tips Card */}
         <div className="hidden lg:block absolute -right-72 top-4 w-64">
            <div className="bg-white rounded-xl shadow-xl p-5 border border-indigo-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Bio Writing Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Keep it concise and professional</li>
                        <li>• Highlight your key skills</li>
                        <li>• Show your personality</li>
                        <li>• Use active voice</li>
                        <li>• Stay within 100 characters</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileBioForm;