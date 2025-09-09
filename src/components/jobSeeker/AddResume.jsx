import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useCreateResumeMutation } from "../../services/seekerService";
import { IoCloudUploadOutline, IoDocumentTextOutline, IoCheckmarkCircle } from "react-icons/io5";

const validationSchema = Yup.object().shape({
   resume_title: Yup.string().required("Resume title is required."),
   resume: Yup.mixed()
      .required("Resume is required.")
      .test(
         "fileSize",
         "File size is too large",
         (value) => value && value.size <= 2 * 1024 * 1024 // 2MB size limit
      )
      .test(
         "fileFormat",
         "Unsupported Format",
         (value) =>
            value &&
            ["application/pdf", "application/msword"].includes(value.type)
      ),
});

const initialValues = {
   resume_title: "",
   resume: null,
};

const AddResume = ({ setIsAddingResume }) => {
   const createResumeMutation = useCreateResumeMutation();

   const handleSubmit = (values, { setSubmitting, setFieldError }) => {
      console.log(values);
      createResumeMutation.mutate(values, {
         onSuccess: () => {
            setIsAddingResume(false);
         },
         onError: (error) => {
            if (error.response && error.response.data) {
               const errors = error.response.data;
               Object.keys(errors).forEach((field) => {
                  setFieldError(field, errors[field][0]);
               });
            }
         },
      });

      setSubmitting(false);
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, touched, errors, setFieldValue, values }) => (
                  <Form encType="multipart/form-data" className="relative">
                     {/* Header Section */}
                     <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 rounded-t-2xl relative">
                        <div className="flex items-center justify-center">
                           <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                              <IoDocumentTextOutline className="w-8 h-8 text-white" />
                           </div>
                           <div className="text-center">
                              <h1 className="text-2xl md:text-3xl font-bold text-white">
                                 Upload Resume
                              </h1>
                              <p className="text-emerald-100 mt-1">
                                 Add your professional resume
                              </p>
                           </div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                           onClick={() => setIsAddingResume(false)}
                           className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                           type="button"
                        >
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                     </div>

                     {/* Form Content */}
                     <div className="px-8 py-8">
                        {/* Resume Title Section */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              Resume Details
                           </h3>
                           
                           <div className="relative">
                              <Field
                                 type="text"
                                 name="resume_title"
                                 placeholder="Enter a descriptive title for your resume"
                                 className={`block w-full px-4 py-3 border-2 rounded-xl shadow-sm bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 placeholder-gray-400 ${
                                    touched["resume_title"] && errors["resume_title"]
                                       ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                                       : touched["resume_title"] && !errors["resume_title"]
                                       ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-200"
                                       : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                 } focus:ring-4 focus:ring-opacity-20`}
                              />
                              
                              {touched["resume_title"] && !errors["resume_title"] && values.resume_title && (
                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <IoCheckmarkCircle className="w-5 h-5 text-emerald-500" />
                                 </div>
                              )}
                           </div>

                           <ErrorMessage
                              name="resume_title"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center"
                           >
                              {(msg) => (
                                 <>
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {msg}
                                 </>
                              )}
                           </ErrorMessage>
                        </div>

                        {/* File Upload Section */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <IoCloudUploadOutline className="w-5 h-5 text-teal-600 mr-2" />
                              Resume File
                           </h3>
                           
                           <div className="relative">
                              <input
                                 type="file"
                                 name="resume"
                                 id="resume-upload"
                                 className="sr-only"
                                 accept=".pdf,.doc,.docx"
                                 onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFieldValue("resume", file);
                                 }}
                              />
                              
                              <label
                                 htmlFor="resume-upload"
                                 className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                                    touched["resume"] && errors["resume"]
                                       ? "border-red-400 bg-red-50"
                                       : touched["resume"] && !errors["resume"] && values.resume
                                       ? "border-emerald-400 bg-emerald-50"
                                       : "border-gray-300 hover:border-emerald-400"
                                 }`}
                              >
                                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {values.resume ? (
                                       <>
                                          <IoCheckmarkCircle className="w-10 h-10 text-emerald-500 mb-2" />
                                          <p className="text-sm text-emerald-600 font-medium">
                                             {values.resume.name}
                                          </p>
                                          <p className="text-xs text-gray-500 mt-1">
                                             {(values.resume.size / 1024 / 1024).toFixed(2)} MB
                                          </p>
                                       </>
                                    ) : (
                                       <>
                                          <IoCloudUploadOutline className="w-10 h-10 text-gray-400 mb-2" />
                                          <p className="text-sm text-gray-600">
                                             <span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
                                          </p>
                                          <p className="text-xs text-gray-500 mt-1">
                                             PDF, DOC up to 2MB
                                          </p>
                                       </>
                                    )}
                                 </div>
                              </label>
                           </div>

                           <ErrorMessage
                              name="resume"
                              component="div"
                              className="text-red-500 text-sm mt-2 flex items-center"
                           >
                              {(msg) => (
                                 <>
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {msg}
                                 </>
                              )}
                           </ErrorMessage>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                           <button
                              type="button"
                              onClick={() => setIsAddingResume(false)}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                           >
                              Cancel
                           </button>
                           
                           <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg flex items-center justify-center ${
                                 isSubmitting ? "cursor-not-allowed opacity-50 transform-none" : ""
                              }`}
                           >
                              {isSubmitting && (
                                 <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    viewBox="0 0 24 24"
                                 >
                                    <circle
                                       className="opacity-25"
                                       cx="12"
                                       cy="12"
                                       r="10"
                                       stroke="currentColor"
                                       strokeWidth="4"
                                    ></circle>
                                    <path
                                       className="opacity-75"
                                       fill="currentColor"
                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                                    ></path>
                                 </svg>
                              )}
                              {isSubmitting ? "Uploading..." : "Upload Resume"}
                           </button>
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
                     <h3 className="text-sm font-semibold text-gray-800">Upload Tips</h3>
                     <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li>• Use a clear, descriptive title</li>
                        <li>• PDF format recommended</li>
                        <li>• Keep file size under 2MB</li>
                        <li>• Ensure text is readable</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddResume;