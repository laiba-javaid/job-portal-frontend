import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({
   name,
   label,
   type = "text",
   touched,
   errors,
   disabled,
   placeholder = "",
   className = null,
}) => {
   const hasError = touched[name] && errors[name];
   const isValid = touched[name] && !errors[name];

   return (
      <div className={`mb-6 ${className}`}>
         {/* Label with enhanced styling */}
         <label 
            htmlFor={name} 
            className="block text-gray-800 font-semibold mb-3 text-sm tracking-wide uppercase transition-colors duration-200 hover:text-emerald-600"
         >
            {label}
         </label>

         {/* Input field wrapper with enhanced styling */}
         <div className="relative group">
            <Field
               type={type}
               name={name}
               id={name}
               disabled={disabled}
               placeholder={placeholder}
               className={`
                  block w-full px-4 py-3.5 text-gray-800 bg-white border-2 rounded-xl 
                  shadow-sm transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500
                  hover:shadow-md hover:border-gray-400
                  disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60
                  placeholder:text-gray-400 placeholder:italic
                  ${hasError 
                     ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100" 
                     : isValid 
                        ? "border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-100" 
                        : "border-gray-300 hover:border-gray-400"
                  }
               `}
            />

            {/* Success Icon */}
            {isValid && (
               <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg 
                     className="w-5 h-5 text-emerald-500 animate-pulse" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                  >
                     <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                     />
                  </svg>
               </div>
            )}

            {/* Error Icon */}
            {hasError && (
               <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg 
                     className="w-5 h-5 text-red-500 animate-bounce" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                  >
                     <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                     />
                  </svg>
               </div>
            )}

            {/* Focus indicator line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-300 group-focus-within:scale-x-100 rounded-full"></div>
         </div>

         {/* Enhanced Error Message */}
         <ErrorMessage name={name}>
            {(msg) => (
               <div className="mt-2 flex items-start space-x-2 animate-fadeIn">
                  <svg 
                     className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                  >
                     <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                     />
                  </svg>
                  <span className="text-red-600 text-sm font-medium">{msg}</span>
               </div>
            )}
         </ErrorMessage>

         {/* Success Message */}
         {isValid && (
            <div className="mt-2 flex items-start space-x-2 animate-fadeIn">
               <svg 
                  className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
               >
                  <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     strokeWidth={2} 
                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
               </svg>
               <span className="text-emerald-600 text-sm font-medium">Looks good!</span>
            </div>
         )}

         {/* Custom CSS for animations */}
         <style jsx>{`
            @keyframes fadeIn {
               from {
                  opacity: 0;
                  transform: translateY(-10px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
            
            .animate-fadeIn {
               animation: fadeIn 0.3s ease-out forwards;
            }
         `}</style>
      </div>
   );
};

export default InputField;