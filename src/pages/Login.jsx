import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin, useLogout } from "../services/authService";
import { Form, Formik } from "formik";
import { loginValidationSchema } from "../utils/validationSchemas";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
   const [errorMessage, setErrorMessage] = useState("");
   const { mutateAsync: login } = useLogin();
   const { mutateAsync: logout } = useLogout();
   const { updateUser } = useAuth();
   const navigate = useNavigate();

   const location = useLocation();
   const username = location.state?.username || "";

   const initialValues = {
      username: username,
      password: "",
   };

   const handleSubmit = async (values) => {
      setErrorMessage("");

      const response = await login(values);
      if (response?.status && response.status === "success") {
         const role = response.user?.role;
         updateUser(response.user);

         if (role === "admin") {
            navigate("/admin/dashboard");
         } else if (role === "company") {
            navigate("/company/profile");
         } else if (role === "job_seeker") {
            navigate("/");
         } else {
            logout();
         }
      } else {
         setErrorMessage(response.data.detail);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
         {/* Background decorative elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
         </div>

         <div className="relative w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
               {/* Header */}
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                  <h1 className="text-3xl font-bold text-white text-center">
                     Welcome Back
                  </h1>
                  <p className="text-blue-100 text-center mt-2">
                     Sign in to your account
                  </p>
               </div>

               {/* Form */}
               <div className="p-8">
                  <Formik
                     initialValues={initialValues}
                     validationSchema={loginValidationSchema}
                     onSubmit={handleSubmit}
                  >
                     {({ isSubmitting, touched, errors }) => (
                        <Form className="space-y-6">
                           <InputField
                              name="username"
                              label="Username"
                              touched={touched}
                              errors={errors}
                           />
                           <InputField
                              type="password"
                              name="password"
                              label="Password"
                              touched={touched}
                              errors={errors}
                           />

                           {errorMessage && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                 <div className="flex">
                                    <div className="flex-shrink-0">
                                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                       </svg>
                                    </div>
                                    <div className="ml-3">
                                       <p className="text-sm text-red-800">{errorMessage}</p>
                                    </div>
                                 </div>
                              </div>
                           )}

                           <div className="space-y-4">
                              <SubmitButton
                                 isSubmitting={isSubmitting}
                                 text="Sign In"
                              />
                              
                              <div className="text-center">
                                 <span className="text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                       to="/register"
                                       className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 hover:underline"
                                    >
                                       Register here
                                    </Link>
                                 </span>
                              </div>
                           </div>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>

            {/* Bottom decoration */}
            <div className="text-center mt-8">
               <p className="text-gray-500 text-sm">
                  Secure login powered by advanced encryption
               </p>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;