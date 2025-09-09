import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Form, Formik } from "formik";
import { userUpdateValidationSchema } from "../../utils/validationSchemas";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import { useUpdateUserMutation } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
   const { user } = useAuth();
   const initialValues = user;
   const { mutate } = useUpdateUserMutation();
   const navigate = useNavigate();

   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
      console.log(values);
      mutate(values, {
         onSuccess: () => {
            console.log("successfully");
            navigate("/job_seeker/profile/");
         },
         onError: (err) => {
            console.log(err.response.data);
            setErrors(err.response.data);
         },
      });
      setSubmitting(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
         <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
               {/* Header Section */}
               <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                  <div className="flex items-center">
                     <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-white">
                           Update Profile
                        </h2>
                        <p className="text-emerald-100 mt-1">
                           Keep your profile information up to date
                        </p>
                     </div>
                  </div>
               </div>

               <Formik
                  initialValues={initialValues}
                  validationSchema={userUpdateValidationSchema}
                  onSubmit={handleSubmit}
               >
                  {({ touched, errors, isSubmitting }) => (
                     <Form className="px-8 py-8">
                        {/* Personal Information Section */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                              <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Personal Information
                           </h3>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                                 <InputField
                                    name="first_name"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                                 <InputField
                                    name="last_name"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Account Information Section */}
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                              <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              Account Details
                           </h3>

                           <div className="space-y-6">
                              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                                 <InputField
                                    name="username"
                                    label="Username"
                                    placeholder="Choose a unique username"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                                 <InputField
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email address"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
                           <button
                              type="button"
                              onClick={() => navigate("/job_seeker/profile/")}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform hover:scale-105"
                           >
                              Cancel
                           </button>
                           <SubmitButton
                              isSubmitting={isSubmitting}
                              text="Update Profile"
                              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                           />
                        </div>
                     </Form>
                  )}
               </Formik>

               {/* Tips Card - Positioned as overlay on larger screens */}
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
                           <h3 className="text-sm font-semibold text-gray-800">Profile Tips</h3>
                           <ul className="text-xs text-gray-600 mt-2 space-y-1">
                              <li>• Use your real name for better credibility</li>
                              <li>• Choose a memorable username</li>
                              <li>• Keep your email address current</li>
                              <li>• Ensure all information is accurate</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateProfile;