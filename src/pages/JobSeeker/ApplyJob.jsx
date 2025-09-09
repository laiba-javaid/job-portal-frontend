   import React, { useState } from "react";
   import {
      useCreateApplicationMutation,
      useFetchResumesQuery,
   } from "../../services/seekerService";
   import { IoMdCloseCircleOutline } from "react-icons/io";
   import { Formik, Field, Form, ErrorMessage } from "formik";
   import { useNavigate } from "react-router-dom";
   import ResumeUploader from "../../components/ResumeUploader"; 


   const ApplyJob = ({ setIsApplying, jobId }) => {
      const [isResumeNull, setIsResumeNull] = useState(false);
      const { data, isLoading } = useFetchResumesQuery();
      const { mutate, isError, error } = useCreateApplicationMutation();
      const navigate = useNavigate();

      const handleSubmit = (values, { setSubmitting }) => {
         setIsResumeNull(false);
         if (!values.resume) {
            setIsResumeNull(true);
            setSubmitting(false);
         } else {
            mutate(
               { ...values, job: jobId },
               {
                  onSuccess: () => {
                     setIsApplying(false);
                     navigate("/");
                     setSubmitting(false);
                  },
                  onError: () => {
                     setSubmitting(false);
                  },
               }
            );
         }
      };

      return (
         <Formik
            initialValues={{ resume: "", cover_letter: "" }}
            onSubmit={handleSubmit}
         >
            {({ isSubmitting }) => (
               <Form className="lg:w-3/5 xl:w-2/5 mx-auto bg-white rounded-lg shadow-lg p-6 relative">
                  {isError && (
                     <p className="text-center mx-auto w-3/6 p-2 border border-red-300 mb-2 text-red-400">
                        {error.response.data.detail}
                     </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-start">
                     {/* Resume Selection */}
                     <ResumeUploader
                        isResumeNull={isResumeNull}
                        onUpload={() => setIsResumeNull(false)}
                     />



                     {/* Cover Letter */}
                     <div className="border rounded-md border-blue-200 px-3">
                        <p className="text-center font-bold text-gray-600 p-3">
                           Cover Letter
                        </p>
                        <hr />
                        <Field
                           as="textarea"
                           name="cover_letter"
                           cols="33"
                           rows="5"
                           placeholder="Write your cover letter here..."
                           className="w-full my-2 text-sm p-2.5 text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                           name="cover_letter"
                           component="div"
                           className="text-red-500 text-sm mt-1"
                        />
                     </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center md:justify-end md:mr-32">
                     <button
                        type="submit"
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md text-xs hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4 md:mt-1"
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? "loading" : "Apply"}
                     </button>
                  </div>

                  {/* Close Button */}
                  <IoMdCloseCircleOutline
                     onClick={() => setIsApplying(false)}
                     className="text-red-600 cursor-pointer absolute right-1 top-1"
                     size={21}
                  />
               </Form>
            )}
         </Formik>
      );
   };

   export default ApplyJob;
