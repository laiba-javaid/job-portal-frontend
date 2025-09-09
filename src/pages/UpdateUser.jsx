import { Formik, Form } from "formik";
import { userUpdateValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthContext";
import { useUpdateUserMutation } from "../services/authService";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
   const { user } = useAuth();
   const { mutate, isLoading, isError, error } = useUpdateUserMutation();
   const navigate = useNavigate();

   const handleSubmit = (values, { setFieldError, setSubmitting }) => {
      const filteredValues = Object.fromEntries(
         Object.entries(values).map(([key, value]) => [
            key,
            value === "" ? null : value,
         ])
      );
      mutate(filteredValues, {
         onSuccess: () => {
            console.log("User updated successfully");
            navigate("/admin/dashboard/");
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

      setSubmitting(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Update Profile
               </h1>
               <p className="text-lg text-gray-600">
                  Keep your admin details up to date
               </p>
               <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
               {/* Card Header */}
               <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">Admin Details</h2>
                  <p className="text-blue-100 mt-1">Update your personal information below</p>
               </div>

               {/* Form Content */}
               <div className="px-8 py-8">
                  <Formik
                     initialValues={user}
                     validationSchema={userUpdateValidationSchema}
                     onSubmit={handleSubmit}
                     enableReinitialize
                  >
                     {({ touched, errors, isSubmitting }) => (
                        <Form>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-1">
                                 <InputField
                                    name="first_name"
                                    label="First Name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                              <div className="space-y-1">
                                 <InputField
                                    name="last_name"
                                    label="Last Name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>

                           <div className="mt-6">
                              <InputField
                                 name="username"
                                 label="Username"
                                 touched={touched}
                                 errors={errors}
                              />
                           </div>

                           <div className="mt-6">
                              <InputField
                                 name="email"
                                 label="Email Address"
                                 type="email"
                                 touched={touched}
                                 errors={errors}
                              />
                           </div>

                           {/* Error Display */}
                           {isError && (
                              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                                 <div className="flex">
                                    <div className="flex-shrink-0">
                                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                       </svg>
                                    </div>
                                    <div className="ml-3">
                                       <p className="text-sm text-red-700">
                                          There was an error updating your profile. Please try again.
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Action Buttons */}
                           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                              <button
                                 type="button"
                                 onClick={() => navigate("/admin/dashboard/")}
                                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                              >
                                 Cancel
                              </button>
                              <SubmitButton 
                                 isSubmitting={isSubmitting} 
                                 text="Update Profile"
                                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                              />
                           </div>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
               <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                     <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-lg font-medium text-gray-800">Keep Your Information Current</h3>
                     <p className="text-gray-600 mt-1">
                        Regular updates to your profile help maintain security and ensure you receive important notifications.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateUser;