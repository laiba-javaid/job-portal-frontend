import { Field, Form, Formik } from "formik";
import React from "react";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { userUpdateValidationSchema } from "../../utils/validationSchemas";
import { IoCloseSharp } from "react-icons/io5";
import { useUpdateUserMutation } from "../../services/authService";

const UpdateUserForm = ({ user, onClick }) => {
   const { mutate, isLoading, isError, error } = useUpdateUserMutation();

   const handleSubmit = async (values, { setFieldError }) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );
      mutate(filteredValues, {
         onSuccess: () => {
            onClick(true);
            console.log("User updated successfully");
         },
         onError: (error) => {
            console.error("Error updating user:", error);

            if (error.response && error.response.data) {
               const errors = error.response.data;
               Object.keys(errors).forEach((field) => {
                  setFieldError(field, errors[field][0]);
               });
            }
         },
      });
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Formik
               initialValues={user}
               validationSchema={userUpdateValidationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors }) => (
                  <Form className="relative">
                     {/* Header Section */}
                     <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 rounded-t-2xl relative">
                        <div className="flex items-center justify-center">
                           <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                           </div>
                           <div className="text-center">
                              <h1 className="text-2xl md:text-3xl font-bold text-white">
                                 Update Your Profile
                              </h1>
                              <p className="text-indigo-100 mt-1">
                                 Keep your personal information current
                              </p>
                           </div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                           onClick={onClick}
                           className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                           type="button"
                        >
                           <IoCloseSharp className="text-xl" />
                        </button>
                     </div>

                     {/* Form Content */}
                     <div className="px-8 py-8">
                        {/* Personal Information */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Personal Information
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="first_name"
                                    label="First Name"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="Enter your first name"
                                 />
                              </div>
                              <div>
                                 <InputField
                                    name="last_name"
                                    label="Last Name"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="Enter your last name"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Account Information */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                              Account Details
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="username"
                                    label="Username"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="Choose a unique username"
                                 />
                              </div>
                              <div>
                                 <InputField
                                    name="email"
                                    label="Email Address"
                                    touched={touched}
                                    errors={errors}
                                    type="email"
                                    placeholder="your.email@example.com"
                                 />
                              </div>
                           </div>
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
                                       There was an error updating your profile. Please check the information and try again.
                                    </p>
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                           <button
                              type="button"
                              onClick={onClick}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                           >
                              Cancel
                           </button>
                           <SubmitButton 
                              isSubmitting={isSubmitting} 
                              text="Update Profile"
                              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                           />
                        </div>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>

         {/* Security Tips Card */}
         <div className="hidden lg:block absolute bottom-8 left-8 max-w-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Profile Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Use your real name for verification</li>
                        <li>• Choose a unique, memorable username</li>
                        <li>• Keep your email address current</li>
                        <li>• Complete profile for better opportunities</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateUserForm;