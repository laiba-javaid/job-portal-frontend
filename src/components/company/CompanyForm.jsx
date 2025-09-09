import { Form, Formik } from "formik";
import React from "react";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { companyFormValidationSchema } from "../../utils/validationSchemas";
import { IoCloseSharp } from "react-icons/io5";
import { useUpdateCompanyMutation } from "../../services/companyService";

const CompanyForm = ({ initialValues, onClick }) => {
   const { mutate, isLoading, isError, error } = useUpdateCompanyMutation();

   const handleSubmit = async (values) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );
      mutate(filteredValues, {
         onSuccess: () => {
            onClick(true);
            console.log("Company updated successfully");
         },
         onError: (error) => {
            console.error("Error updating company:", error);
         },
      });
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Formik
               initialValues={initialValues}
               validationSchema={companyFormValidationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors }) => (
                  <Form className="relative">
                     {/* Header Section */}
                     <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-t-2xl relative">
                        <div className="flex items-center justify-center">
                           <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                           </div>
                           <div className="text-center">
                              <h1 className="text-2xl md:text-3xl font-bold text-white">
                                 Update Company Profile
                              </h1>
                              <p className="text-blue-100 mt-1">
                                 Keep your company information current
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
                        {/* Company Basic Info */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Basic Information
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="title"
                                    label="Company Name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                              <div>
                                 <InputField
                                    name="location"
                                    label="Location"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Company Details */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9m9 9a9 9 0 01-9 9m9-9H3m9 9v-9" />
                              </svg>
                              Company Details
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="website"
                                    label="Website URL"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="https://www.example.com"
                                 />
                              </div>
                              <div>
                                 <InputField
                                    name="established_date"
                                    label="Established Date"
                                    touched={touched}
                                    errors={errors}
                                    type="date"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Company Description */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              About Company
                           </h3>
                           <InputField
                              name="description"
                              label="Company Description"
                              touched={touched}
                              errors={errors}
                              placeholder="Tell us about your company, culture, and what makes you unique..."
                              rows={4}
                           />
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
                                       There was an error updating your company profile. Please try again.
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
                              text="Update Company"
                              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                           />
                        </div>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>

         {/* Tips Card */}
         <div className="hidden lg:block absolute bottom-8 left-8 max-w-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Pro Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Use a clear, professional company name</li>
                        <li>• Include your complete website URL</li>
                        <li>• Write a compelling company description</li>
                        <li>• Keep location information accurate</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CompanyForm;