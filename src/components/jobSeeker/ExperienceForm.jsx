import React from "react";
import { Formik, Field, Form } from "formik";
import { ExperienceValidationSchema } from "../../utils/validationSchemas";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import {
   useCreateExperienceMutation,
   useUpdateExperienceMutation,
} from "../../services/seekerService";

const ExperienceForm = ({
   setIsAddingExp,
   updationValues = null,
   setIsUpdatingExp,
}) => {
   const { mutate, isLoading, isError, error } = useCreateExperienceMutation();
   const updateExperienceMutation = useUpdateExperienceMutation();

   const initialValues = {
      job_title: updationValues?.job_title || "",
      company: updationValues?.company || "",
      start_date: updationValues?.start_date || "",
      end_date: updationValues?.end_date || "",
      is_current: updationValues?.is_current || false,
   };

   const handleSubmit = (values, { setSubmitting }) => {
      console.log(values);
      if (updationValues) {
         console.log("updatingg.....");
         updateExperienceMutation.mutate(
            { id: updationValues.id, ...values },
            {
               onSuccess: () => {
                  setIsAddingExp(false);
                  setIsUpdatingExp(false);
                  console.log(
                     `Experience with id ${updationValues.id} updated successfully.`
                  );
               },
               onError: (error) => {
                  console.error("Error updating experience:", error);
               },
            }
         );
      } else {
         mutate(values, {
            onSuccess: () => {
               setIsAddingExp(false);
            },
            onError: (error) => {
               console.error("Error creating experience:", error);
            },
         });
      }

      setSubmitting(false);
   };

   return (
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
         {/* Header Section */}
         <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <div className="flex items-center">
               <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
                  </svg>
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-white">
                     {updationValues ? "Update Experience" : "Add New Experience"}
                  </h2>
                  <p className="text-emerald-100 mt-1">
                     {updationValues ? "Edit your professional experience" : "Share your professional journey"}
                  </p>
               </div>
            </div>
         </div>

         <Formik
            initialValues={initialValues}
            validationSchema={ExperienceValidationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, touched, errors, isSubmitting }) => (
               <Form className="px-8 py-8">
                  {/* Position Details Section */}
                  <div className="mb-8">
                     <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Position Information
                     </h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                           <InputField
                              name="job_title"
                              label="Job Title"
                              placeholder="Software Engineer, Marketing Manager, etc."
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                           <InputField
                              name="company"
                              label="Company"
                              placeholder="Google, Microsoft, Startup Inc."
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Duration Section */}
                  <div className="mb-8">
                     <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
                        </svg>
                        Employment Duration
                     </h3>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="transform transition-all duration-200 hover:scale-[1.02]">
                           <InputField
                              name="start_date"
                              label="Start Date"
                              type="month"
                              touched={touched}
                              errors={errors}
                           />
                        </div>
                        <div className={`transform transition-all duration-200 hover:scale-[1.02] ${values.is_current ? 'opacity-50' : ''}`}>
                           <InputField
                              name="end_date"
                              label="End Date"
                              type="month"
                              touched={touched}
                              errors={errors}
                              disabled={values.is_current}
                           />
                        </div>
                     </div>

                     {/* Current Position Toggle */}
                     <div className="mt-6">
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                 <div className="bg-emerald-100 rounded-full p-2">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                 </div>
                                 <div>
                                    <label
                                       htmlFor="is_current"
                                       className="text-lg font-semibold text-gray-800 cursor-pointer"
                                    >
                                       Current Position
                                    </label>
                                    <p className="text-sm text-gray-600">I currently work here</p>
                                 </div>
                              </div>
                              <Field
                                 type="checkbox"
                                 id="is_current"
                                 name="is_current"
                                 className="w-6 h-6 text-emerald-600 bg-white border-2 border-emerald-300 rounded-lg focus:ring-emerald-500 focus:ring-2 cursor-pointer transform transition-all duration-200 hover:scale-110"
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Error Display */}
                  {(isError || updateExperienceMutation.isError) && (
                     <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                        <div className="flex">
                           <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                           </div>
                           <div className="ml-3">
                              <p className="text-sm text-red-700">
                                 There was an error {updationValues ? 'updating' : 'adding'} your experience. Please try again.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                     <button
                        type="button"
                        onClick={() => {
                           setIsAddingExp(false);
                           if (setIsUpdatingExp) setIsUpdatingExp(false);
                        }}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-105"
                     >
                        Cancel
                     </button>
                     <SubmitButton
                        isSubmitting={isSubmitting || updateExperienceMutation.isLoading}
                        text={updationValues ? "Update Experience" : "Add Experience"}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                     />
                  </div>
               </Form>
            )}
         </Formik>

         {/* Tips Card - Positioned as overlay */}
         <div className="hidden xl:block absolute -right-80 top-8 w-72">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Experience Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Use clear, professional job titles</li>
                        <li>• Include full company names</li>
                        <li>• Check "Current Position" if still employed</li>
                        <li>• Ensure dates are accurate and consistent</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ExperienceForm;