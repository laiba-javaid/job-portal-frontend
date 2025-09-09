import { useRegister } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";

const initialValues = {
   first_name: "",
   last_name: "",
   username: "",
   email: "",
   password: "",
   confirmPassword: "",
   role: "job_seeker",
   // Company fields
   company_title: "",
   company_location: "",
   company_description: "",
   company_website: "",
};

const Register = () => {
   const { mutateAsync: register } = useRegister();
   const navigate = useNavigate();
   const [selectedRole, setSelectedRole] = useState("job_seeker");

   const handleSubmit = async (
      values,
      { setSubmitting, resetForm, setFieldError }
   ) => {
      const registrationData = {
         first_name: values.first_name,
         last_name: values.last_name,
         username: values.username,
         email: values.email,
         password: values.password,
         role: values.role,
      };

      // Add company data if role is company
      if (values.role === "company") {
         registrationData.company_title = values.company_title;
         registrationData.company_location = values.company_location;
         registrationData.company_description = values.company_description;
         registrationData.company_website = values.company_website;
      }

      const { status, data } = await register(registrationData);

      if (status === "success") {
         resetForm();
         navigate("/login", { 
            state: { 
               username: values.username,
               message: values.role === "company" 
                  ? "Registration successful! Your company profile has been created." 
                  : "Registration successful!"
            } 
         });
      } else if (status === "error") {
         if (typeof data === "object") {
            Object.keys(data).forEach((field) => {
               setFieldError(field, data[field][0]);
            });
         } else {
            setFieldError("general", data);
         }
      }

      setSubmitting(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
         {/* Background decorative elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-blue-400/15 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl"></div>
         </div>

         <div className="relative max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
               {/* Header */}
               <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                  <h1 className="text-3xl font-bold text-white text-center">
                     Create Account
                  </h1>
                  <p className="text-purple-100 text-center mt-2">
                     Join our platform and start your journey
                  </p>
               </div>

               <div className="p-8">
                  <Formik
                     initialValues={initialValues}
                     validationSchema={registerValidationSchema}
                     onSubmit={handleSubmit}
                  >
                     {({ isSubmitting, touched, errors, values, setFieldValue }) => (
                        <Form className="space-y-6">
                           {/* Personal Information Section */}
                           <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100">
                              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                 Personal Information
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <InputField
                                    name="first_name"
                                    label="First Name"
                                    touched={touched}
                                    errors={errors}
                                 />
                                 <InputField
                                    name="last_name"
                                    label="Last Name"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                 <InputField
                                    name="username"
                                    label="Username"
                                    touched={touched}
                                    errors={errors}
                                 />
                                 <InputField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>

                           {/* Role Selection */}
                           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                 <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                 Account Type
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <label className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                    selectedRole === "job_seeker" 
                                       ? "border-blue-500 bg-blue-50" 
                                       : "border-gray-200 bg-white hover:border-blue-300"
                                 }`}>
                                    <Field
                                       type="radio"
                                       name="role"
                                       value="job_seeker"
                                       onChange={(e) => {
                                          setFieldValue("role", e.target.value);
                                          setSelectedRole(e.target.value);
                                       }}
                                       className="sr-only"
                                    />
                                    <div className="flex items-center">
                                       <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                          selectedRole === "job_seeker" 
                                             ? "border-blue-500 bg-blue-500" 
                                             : "border-gray-300"
                                       }`}>
                                          {selectedRole === "job_seeker" && (
                                             <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                          )}
                                       </div>
                                       <div>
                                          <div className="font-medium text-gray-800">Job Seeker</div>
                                          <div className="text-sm text-gray-600">Looking for opportunities</div>
                                       </div>
                                    </div>
                                 </label>

                                 <label className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                    selectedRole === "company" 
                                       ? "border-purple-500 bg-purple-50" 
                                       : "border-gray-200 bg-white hover:border-purple-300"
                                 }`}>
                                    <Field
                                       type="radio"
                                       name="role"
                                       value="company"
                                       onChange={(e) => {
                                          setFieldValue("role", e.target.value);
                                          setSelectedRole(e.target.value);
                                       }}
                                       className="sr-only"
                                    />
                                    <div className="flex items-center">
                                       <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                          selectedRole === "company" 
                                             ? "border-purple-500 bg-purple-500" 
                                             : "border-gray-300"
                                       }`}>
                                          {selectedRole === "company" && (
                                             <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                          )}
                                       </div>
                                       <div>
                                          <div className="font-medium text-gray-800">Company</div>
                                          <div className="text-sm text-gray-600">Hiring talent</div>
                                       </div>
                                    </div>
                                 </label>
                              </div>

                              <ErrorMessage
                                 name="role"
                                 component="div"
                                 className="text-red-500 text-sm mt-2"
                              />
                           </div>

                           {/* Company Information - Only show if role is company */}
                           {selectedRole === "company" && (
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 animate-fadeIn">
                                 <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    Company Information
                                 </h3>
                                 
                                 <div className="space-y-4">
                                    <InputField
                                       name="company_title"
                                       label="Company Name *"
                                       touched={touched}
                                       errors={errors}
                                       placeholder="Enter your company name"
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <InputField
                                          name="company_location"
                                          label="Company Location"
                                          touched={touched}
                                          errors={errors}
                                          placeholder="e.g., New York, NY"
                                       />
                                       
                                       <InputField
                                          name="company_website"
                                          label="Company Website"
                                          type="url"
                                          touched={touched}
                                          errors={errors}
                                          placeholder="https://www.yourcompany.com"
                                       />
                                    </div>
                                    
                                    <div>
                                       <label
                                          htmlFor="company_description"
                                          className="block text-sm font-medium text-gray-700 mb-2"
                                       >
                                          Company Description
                                       </label>
                                       <Field
                                          as="textarea"
                                          name="company_description"
                                          id="company_description"
                                          rows="3"
                                          placeholder="Brief description of your company..."
                                          className={`block w-full px-4 py-3 border rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                             touched.company_description && errors.company_description
                                                ? "border-red-500 bg-red-50"
                                                : touched.company_description
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-300 bg-white hover:border-gray-400"
                                          }`}
                                       />
                                       <ErrorMessage
                                          name="company_description"
                                          component="div"
                                          className="text-red-500 text-sm mt-1"
                                       />
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Password Section */}
                           <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                 <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                 Security
                              </h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <InputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    touched={touched}
                                    errors={errors}
                                 />
                                 <InputField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    touched={touched}
                                    errors={errors}
                                 />
                              </div>
                           </div>
                           
                           <div className="flex flex-col items-center space-y-4 pt-4">
                              <SubmitButton
                                 isSubmitting={isSubmitting}
                                 text="Create Account"
                              />
                              
                              <div className="text-center">
                                 <span className="text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                       to="/login"
                                       className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-300 hover:underline"
                                    >
                                       Sign in here
                                    </Link>
                                 </span>
                              </div>
                           </div>

                           {/* Display general form error if exists */}
                           {errors.general && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                 <div className="flex">
                                    <div className="flex-shrink-0">
                                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                       </svg>
                                    </div>
                                    <div className="ml-3">
                                       <p className="text-sm text-red-800">{errors.general}</p>
                                    </div>
                                 </div>
                              </div>
                           )}
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;