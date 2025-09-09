import { NavLink } from "react-router-dom";
import { useGetUserQuery, useLogout } from "../services/authService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const NavBar = () => {
   const { mutateAsync: logout } = useLogout();
   const { data: user, isLoading } = useGetUserQuery();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const handleLogout = () => {
      logout();
   };

   let links = [];
   const role = user?.role;
   if (role) {
      if (role === "admin") {
         links.push({ href: "/admin/dashboard", text: "Dashboard", icon: "dashboard" });
      } else if (role === "job_seeker") {
         links.push({ href: "/", text: "Home", icon: "home" });
         links.push({ href: "/job_seeker/applied-jobs", text: "Applications", icon: "applications" });
         links.push({ href: "/job_seeker/profile", text: "Profile", icon: "profile" });
      } else if (role === "company") {
         links.push({ href: "/company/profile", text: "Profile", icon: "profile" });
         links.push({ href: "/company/jobs", text: "Jobs", icon: "jobs" });
      }
   } else {
      links.push({ href: "/signup", text: "Signup", icon: "signup" });
      links.push({ href: "/login", text: "Login", icon: "login" });
   }

   const getIcon = (iconType) => {
      const iconClass = "w-5 h-5 mr-2";
      switch (iconType) {
         case "home":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
               </svg>
            );
         case "dashboard":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
            );
         case "applications":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
            );
         case "profile":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            );
         case "jobs":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2.5A1.5 1.5 0 0120.5 7.5v.755" />
               </svg>
            );
         case "signup":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
               </svg>
            );
         case "login":
            return (
               <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
               </svg>
            );
         default:
            return null;
      }
   };

   if (isLoading) {
      return (
         <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                     <Skeleton height={32} width={120} baseColor="#ffffff20" highlightColor="#ffffff40" />
                  </div>
                  <div className="hidden md:block">
                     <div className="ml-10 flex items-baseline space-x-4">
                        <Skeleton height={32} width={80} baseColor="#ffffff20" highlightColor="#ffffff40" />
                        <Skeleton height={32} width={80} baseColor="#ffffff20" highlightColor="#ffffff40" />
                        <Skeleton height={32} width={80} baseColor="#ffffff20" highlightColor="#ffffff40" />
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      );
   }

   return (
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl sticky top-0 z-[100]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                     <div className="bg-white bg-opacity-20 rounded-lg p-2 mr-3">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2.5A1.5 1.5 0 0120.5 7.5v.755" />
                        </svg>
                     </div>
                     <span className="text-white text-xl font-bold">JobPortal</span>
                  </div>
               </div>

               {/* Desktop Navigation */}
               <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-2">
                     {links.map((link, index) => (
                        <NavLink
                           key={index}
                           to={link.href}
                           className={({ isActive }) =>
                              isActive
                                 ? "bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 backdrop-blur-sm"
                                 : "text-white hover:bg-white hover:bg-opacity-10 px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 hover:backdrop-blur-sm"
                           }
                        >
                           {getIcon(link.icon)}
                           {link.text}
                        </NavLink>
                     ))}
                     {role && (
                        <button
                           onClick={handleLogout}
                           className="text-white hover:bg-red-500 hover:bg-opacity-80 px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 ml-4 border border-white border-opacity-30 hover:border-red-400"
                        >
                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                           </svg>
                           Logout
                        </button>
                     )}
                  </div>
               </div>

               {/* Mobile menu button */}
               <div className="md:hidden">
                  <button
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                  >
                     <span className="sr-only">Open main menu</span>
                     {!isMobileMenuOpen ? (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                     ) : (
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Navigation Menu */}
         {isMobileMenuOpen && (
            <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 bg-black bg-opacity-10 backdrop-blur-sm">
                  {links.map((link, index) => (
                     <NavLink
                        key={index}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                           isActive
                              ? "bg-white bg-opacity-20 text-white block px-3 py-2 rounded-md font-medium flex items-center transition-all duration-200"
                              : "text-white hover:bg-white hover:bg-opacity-10 block px-3 py-2 rounded-md font-medium flex items-center transition-all duration-200"
                        }
                     >
                        {getIcon(link.icon)}
                        {link.text}
                     </NavLink>
                  ))}
                  {role && (
                     <button
                        onClick={() => {
                           handleLogout();
                           setIsMobileMenuOpen(false);
                        }}
                        className="text-white hover:bg-red-500 hover:bg-opacity-80 block px-3 py-2 rounded-md font-medium w-full text-left flex items-center transition-all duration-200 border border-white border-opacity-30 hover:border-red-400 mt-4"
                     >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                     </button>
                  )}
               </div>
            </div>
         )}
      </nav>
   );
};

export default NavBar;