import React, { useState } from "react";
import ProfileCard from "../../components/company/ProfileCard";
import JobCard from "../../components/JobCard";
import {
   useFetchUserCompanyQuery,
   useFetchJobsbyCompanyQuery,
} from "../../services/companyService";
import CompanyForm from "../../components/company/CompanyForm";
import UserCard from "../../components/UserCard";
import UpdateUserForm from "../../components/company/UpdateUserForm";
import JobForm from "../../components/company/JobForm";
import { useGetUserQuery } from "../../services/authService";

const CompanyProfile = () => {
   const [activeSection, setActiveSection] = useState("jobs");
   const [sidebarOpen, setSidebarOpen] = useState(false);

   const handleSectionChange = (section) => {
      setActiveSection(section);
      setSidebarOpen(false); // Close mobile sidebar when section changes
   };
   
   const {
      data: companyData,
      error: companyError,
      isLoading: companyLoading,
   } = useFetchUserCompanyQuery();

   const {
      data: userData,
      error: userError,
      isLoading: userLoading,
   } = useGetUserQuery();

   const {
      data: jobsData,
      error: jobsError,
      isLoading: jobsLoading,
   } = useFetchJobsbyCompanyQuery();

   const companyDetails = {
      title: companyData?.title || "",
      location: companyData?.location || "",
      website: companyData?.website || "",
      established_date: companyData?.established_date || "",
      description: companyData?.description || "",
   };

   const sidebarItems = [
      {
         id: "jobs",
         label: "Job Listings",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
            </svg>
         ),
         count: jobsData?.length || 0
      },
      {
         id: "companyProfile",
         label: "Company Profile",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
         )
      },
      {
         id: "userAccount",
         label: "User Account",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
         )
      },
      {
         id: "updateCompany",
         label: "Edit Company",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
         )
      },
      {
         id: "updateUser",
         label: "Edit Profile",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
         )
      },
      {
         id: "addJob",
         label: "Add New Job",
         icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
         )
      }
   ];

   if (companyLoading || jobsLoading || userLoading)
      return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
               <p className="text-lg font-medium text-gray-700">Loading your company profile...</p>
            </div>
         </div>
      );
      
   if (companyError || jobsError || userError) {
      const error = companyError || jobsError || userError;
      return (
         <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-red-500">
               <div className="flex items-center">
                  <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                     <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
                     <p className="text-red-600">{error.message}</p>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   const renderContent = () => {
      switch (activeSection) {
         case "jobs":
            return (
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
                        <p className="text-gray-600 mt-1">Manage your active job postings</p>
                     </div>
                     <button
                        onClick={() => handleSectionChange("addJob")}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg flex items-center"
                     >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Job
                     </button>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <div className="p-6">
                        {jobsData?.length > 0 ? (
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {jobsData.map((job) => (
                                 <div key={job.id} className="transform hover:scale-105 transition-all duration-200">
                                    <JobCard btn_text={"Open"} job={job} />
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-12">
                              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
                              </svg>
                              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Jobs Posted Yet</h3>
                              <p className="text-gray-500 mb-4">Create your first job posting to attract talented candidates</p>
                              <button
                                 onClick={() => handleSectionChange("addJob")}
                                 className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg"
                              >
                                 Post Your First Job
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            );

         case "companyProfile":
            return (
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
                     <p className="text-gray-600 mt-1">View your company information</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <ProfileCard
                        initialValues={companyDetails}
                        onEdit={() => handleSectionChange("updateCompany")}
                        onAddJob={() => handleSectionChange("addJob")}
                     />
                  </div>
               </div>
            );

         case "userAccount":
            return (
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">User Account</h1>
                     <p className="text-gray-600 mt-1">Manage your personal account information</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <div className="p-6">
                        <UserCard
                           user={userData}
                           onEdit={() => handleSectionChange("updateUser")}
                        />
                     </div>
                  </div>
               </div>
            );

         case "updateCompany":
            return (
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Edit Company Information</h1>
                     <p className="text-gray-600 mt-1">Update your company details and information</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <div className="p-6">
                        <CompanyForm
                           initialValues={companyDetails}
                           onClick={() => handleSectionChange("companyProfile")}
                        />
                     </div>
                  </div>
               </div>
            );

         case "updateUser":
            return (
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Edit User Profile</h1>
                     <p className="text-gray-600 mt-1">Update your personal information and preferences</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <div className="p-6">
                        <UpdateUserForm
                           user={userData}
                           onClick={() => handleSectionChange("userAccount")}
                        />
                     </div>
                  </div>
               </div>
            );

         case "addJob":
            return (
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Create New Job Posting</h1>
                     <p className="text-gray-600 mt-1">Add a new job opportunity to attract candidates</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                     <div className="p-6">
                        <JobForm onClick={() => handleSectionChange("jobs")} />
                     </div>
                  </div>
               </div>
            );

         default:
            return null;
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
         {/* Mobile menu button */}
         <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
            <div className="flex items-center justify-between">
               <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
               >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Menu
               </button>
               <div className="text-sm font-medium text-gray-700">
                  {companyData?.title || "Company Dashboard"}
               </div>
            </div>
         </div>

         <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out lg:flex lg:flex-col`}>
               {/* Sidebar Header */}
               <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="text-xl font-bold">{companyData?.title || "Company"}</h2>
                        <p className="text-blue-100 text-sm mt-1">Dashboard</p>
                     </div>
                     <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white hover:text-blue-200 transition-colors"
                     >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>
               </div>

               {/* Sidebar Navigation */}
               <nav className="p-4 space-y-2">
                  {sidebarItems.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                           activeSection === item.id
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                     >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium flex-1">{item.label}</span>
                        {item.count !== undefined && (
                           <span className={`text-xs px-2 py-1 rounded-full ${
                              activeSection === item.id
                                 ? "bg-white bg-opacity-20 text-white"
                                 : "bg-gray-200 text-gray-600"
                           }`}>
                              {item.count}
                           </span>
                        )}
                     </button>
                  ))}
               </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto">
               <div className="p-6 lg:p-8 w-full">
                  {renderContent()}
               </div>
            </div>
         </div>

         {/* Mobile sidebar backdrop */}
         <div
            className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
               sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setSidebarOpen(false)}
         />
      </div>
   );
};

export default CompanyProfile;