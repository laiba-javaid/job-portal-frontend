import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { JobFormValidationSchema } from "../../utils/validationSchemas";
import { IoCloseSharp } from "react-icons/io5";
import { useCreateJobMutation } from "../../services/companyService";

const initialValues = {
   title: "",
   salary: "",
   vacancy: "",
   description: "",
   employment_type: "Full-time", // Set default value
   last_date_to_apply: "",
};

const JobForm = ({ onClick }) => {
   const [permission, setPermission] = useState(true);
   const createJobMutation = useCreateJobMutation();

   const handleSubmit = (
      values,
      { setSubmitting, setFieldError, resetForm }
   ) => {
      setPermission(true);
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );

      createJobMutation.mutate(filteredValues, {
         onSuccess: () => {
            resetForm();
            onClick(true);
         },
         onError: (error) => {
            if (error.response && error.response.data) {
               const errors = error.response.data;
               Object.keys(errors).forEach((field) => {
                  setFieldError(field, errors[field][0]);
               });
            }

            if (error.response.status === 403) setPermission(false);
         },
      });

      setSubmitting(false);
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <Formik
               initialValues={initialValues}
               validationSchema={JobFormValidationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors }) => (
                  <Form className="relative">
                     {/* Header Section */}
                     <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 rounded-t-2xl relative">
                        <div className="flex items-center justify-center">
                           <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8a2 2 0 012-2h4a2 2 0 012 2v2H8V8z" />
                              </svg>
                           </div>
                           <div className="text-center">
                              <h1 className="text-2xl md:text-3xl font-bold text-white">
                                 Create New Job Posting
                              </h1>
                              <p className="text-emerald-100 mt-1">
                                 Find the perfect candidates for your team
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

                     {/* Permission Error Alert */}
                     {!permission && (
                        <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                           <div className="flex">
                              <div className="flex-shrink-0">
                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                 </svg>
                              </div>
                              <div className="ml-3">
                                 <h3 className="text-sm font-medium text-red-800">
                                    Permission Denied
                                 </h3>
                                 <p className="text-sm text-red-700 mt-1">
                                    The company approval is pending at the Admin. Please wait for approval before posting jobs.
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Form Content */}
                     <div className="px-8 py-8">
                        {/* Job Basic Info */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Job Information
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="title"
                                    label="Job Title"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="e.g. Senior Software Engineer"
                                 />
                              </div>
                              <div>
                                 <InputField
                                    name="salary"
                                    label="Salary"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="e.g. $60,000 - $80,000"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Job Details */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H9m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2M7 14l5-5 5 5" />
                              </svg>
                              Position Details
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                 <InputField
                                    name="vacancy"
                                    label="Number of Positions"
                                    touched={touched}
                                    errors={errors}
                                    placeholder="e.g. 2"
                                 />
                              </div>
                              <div>
                                 <label
                                    htmlFor="employment_type"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                 >
                                    Employment Type
                                 </label>
                                 <Field
                                    as="select"
                                    name="employment_type"
                                    id="employment_type"
                                    className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                       touched.employment_type && errors.employment_type
                                          ? "border-red-300 bg-red-50"
                                          : touched.employment_type
                                          ? "border-emerald-300 bg-emerald-50"
                                          : "border-gray-300 hover:border-gray-400"
                                    }`}
                                 >
                                    <option value="Full-time">Full Time</option>
                                    <option value="Part-time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                 </Field>
                                 <ErrorMessage
                                    name="employment_type"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Application Deadline */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Application Deadline
                           </h3>
                           <div className="max-w-md">
                              <InputField
                                 name="last_date_to_apply"
                                 label="Last Date to Apply"
                                 touched={touched}
                                 errors={errors}
                                 type="date"
                              />
                           </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Job Description
                           </h3>
                           <div>
                              <label
                                 htmlFor="description"
                                 className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                 Detailed Description
                              </label>
                              <Field
                                 as="textarea"
                                 name="description"
                                 id="description"
                                 rows="5"
                                 placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                                 className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none ${
                                    touched.description && errors.description
                                       ? "border-red-300 bg-red-50"
                                       : touched.description
                                       ? "border-emerald-300 bg-emerald-50"
                                       : "border-gray-300 hover:border-gray-400"
                                 }`}
                              />
                              <ErrorMessage
                                 name="description"
                                 component="div"
                                 className="text-red-500 text-sm mt-1"
                              />
                           </div>
                        </div>

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
                              text="Create Job Post"
                              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                           />
                        </div>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>

         {/* Tips Card */}
         <div className="hidden lg:block absolute bottom-8 right-8 max-w-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-semibold text-gray-800">Posting Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Write a clear, specific job title</li>
                        <li>• Include salary range for better response</li>
                        <li>• Be detailed in job description</li>
                        <li>• Set realistic application deadlines</li>
                        <li>• Specify required qualifications</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default JobForm;