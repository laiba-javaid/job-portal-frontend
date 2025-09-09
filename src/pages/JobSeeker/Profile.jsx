import React, { useState } from "react";
import { IoAddCircleOutline, IoDocumentText } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImMail4 } from "react-icons/im";
import { MdWork } from "react-icons/md";
import AddResume from "../../components/jobSeeker/AddResume";
import Resume from "../../components/jobSeeker/Resume";
import Experience from "../../components/jobSeeker/Experience";
import ExperienceForm from "../../components/jobSeeker/ExperienceForm";
import {
   useFetchExperiencesQuery,
   useFetchProfileQuery,
   useFetchResumesQuery,
} from "../../services/seekerService";
import ExperienceSkeleton from "../../components/jobSeeker/skeletons/ExperienceSkeleton";
import ResumeSkeleton from "../../components/jobSeeker/skeletons/ResumeSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetUserQuery } from "../../services/authService";
import { BiEditAlt } from "react-icons/bi";
import ProfileImageForm from "../../components/jobSeeker/ProfileImageForm";
import ProfileBioForm from "../../components/jobSeeker/ProfileBioForm";

const Profile = () => {
   const [isAddingResume, setIsAddingResume] = useState(false);
   const [isAddingExp, setIsAddingExp] = useState(false);
   const [isUpdatingExp, setIsUpdatingExp] = useState(false);
   const [updationExp, setUpdationExp] = useState();
   const [isAddingPicture, setIsAddingPicture] = useState(false);
   const [isAddingBio, setIsAddingBio] = useState(false);

   const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
   const { data: resumes, isLoading: isLoadingResume } = useFetchResumesQuery();
   const { data: profile, isLoading: isLoadingProfile } =
      useFetchProfileQuery();
   const { data: experiences, isLoading: isLoadingExp } =
      useFetchExperiencesQuery();

   const toggleAdd = () => {
      setIsAddingResume((prev) => !prev);
   };

   const closeExpForm = () => {
      setIsAddingExp(false);
      setIsUpdatingExp(false);
   };

   const setUpdation = (exp) => {
      setUpdationExp(exp);
      setIsUpdatingExp(true);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
         <div className="lg:w-4/5 xl:w-3/5 mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
               <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  My Professional Profile
               </h1>
               <p className="text-gray-600 text-lg">Manage your career information and showcase your expertise</p>
            </div>

            {/* User Details Section */}
            <div className="bg-white backdrop-blur-sm bg-opacity-95 border-0 rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
               
               <div className="flex flex-col lg:flex-row items-start lg:items-center relative z-10">
                  <div className="flex-shrink-0 mb-6 lg:mb-0">
                     {isLoadingProfile ? (
                        <Skeleton circle={true} height={160} width={160} />
                     ) : isAddingPicture ? (
                        <ProfileImageForm
                           setIsAddingPicture={setIsAddingPicture}
                        />
                     ) : profile?.profile_photo ? (
                        <div className="relative group">
                           <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-1">
                              <img
                                 className="w-full h-full rounded-full object-cover"
                                 src={profile.profile_photo}
                                 alt="Profile photo"
                              />
                           </div>
                           <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg group-hover:shadow-xl transition-all duration-200">
                              <BiEditAlt
                                 size={20}
                                 onClick={() => setIsAddingPicture(true)}
                                 className="text-blue-600 cursor-pointer hover:text-blue-700"
                              />
                           </div>
                        </div>
                     ) : (
                        <div className="relative group">
                           <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-1">
                              <img
                                 className="w-full h-full rounded-full object-cover"
                                 src="https://loremflickr.com/320/320/girl"
                                 alt="Profile photo"
                              />
                           </div>
                           <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg group-hover:shadow-xl transition-all duration-200">
                              <BiEditAlt
                                 size={20}
                                 onClick={() => setIsAddingPicture(true)}
                                 className="text-blue-600 cursor-pointer hover:text-blue-700"
                              />
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="lg:ml-8 flex-grow">
                     {isLoadingUser ? (
                        <>
                           <div className="mb-4">
                              <Skeleton width={280} height={32} />
                           </div>
                           <div className="flex flex-wrap gap-6 mb-4">
                              <div className="flex items-center">
                                 <FaUserCircle className="text-gray-400 mr-2" size={20} />
                                 <Skeleton width={120} />
                              </div>
                              <div className="flex items-center">
                                 <ImMail4 className="text-gray-400 mr-2" size={18} />
                                 <Skeleton width={150} />
                              </div>
                           </div>
                        </>
                     ) : (
                        <>
                           <h2 className="text-3xl font-bold text-gray-800 mb-4">
                              {user.get_full_name || <Skeleton width={280} />}
                           </h2>
                           <div className="flex flex-wrap gap-6 mb-4">
                              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                                 <FaUserCircle className="text-blue-500 mr-2" size={20} />
                                 <span className="text-gray-700 font-medium">{user.username || <Skeleton width={120} />}</span>
                              </div>
                              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                                 <ImMail4 className="text-emerald-500 mr-2" size={18} />
                                 <span className="text-gray-700 font-medium">{user.email || <Skeleton width={150} />}</span>
                              </div>
                           </div>
                        </>
                     )}

                     {isLoadingProfile ? (
                        <div className="mb-6">
                           <Skeleton count={3} height={20} />
                        </div>
                     ) : isAddingBio ? (
                        <ProfileBioForm
                           setIsAddingBio={setIsAddingBio}
                           profile={profile || ""}
                        />
                     ) : profile?.bio ? (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mb-6">
                           <div className="flex items-start justify-between">
                              <p className="text-gray-700 leading-relaxed flex-grow pr-4">
                                 {profile.bio}
                              </p>
                              <button
                                 onClick={() => setIsAddingBio(true)}
                                 className="flex-shrink-0 p-2 hover:bg-white rounded-lg transition-colors duration-200"
                              >
                                 <BiEditAlt
                                    size={18}
                                    className="text-blue-600 hover:text-blue-700"
                                 />
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100 mb-6">
                           <div className="flex items-center justify-between">
                              <p className="text-red-600 font-medium">
                                 📝 Add your professional bio to make a great first impression
                              </p>
                              <button
                                 onClick={() => setIsAddingBio(true)}
                                 className="flex-shrink-0 p-2 hover:bg-white rounded-lg transition-colors duration-200"
                              >
                                 <BiEditAlt
                                    size={18}
                                    className="text-red-600 hover:text-red-700"
                                 />
                              </button>
                           </div>
                        </div>
                     )}

                     <div className="flex justify-end">
                        <Link
                           to={"update"}
                           className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                           Update Profile
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

            {/* Resumes Section */}
            <div className="bg-white backdrop-blur-sm bg-opacity-95 border-0 rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
               
               <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center">
                     <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl mr-4 shadow-lg">
                        <IoDocumentText className="text-white text-2xl" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                           {isAddingResume ? "Add New Resume" : "My Resumes"}
                        </h2>
                        <p className="text-gray-500 text-sm">Manage your resume collection</p>
                     </div>
                  </div>
                  {isAddingResume ? (
                     <button
                        onClick={toggleAdd}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200"
                     >
                        <IoMdCloseCircleOutline
                           className="text-red-500 hover:text-red-600"
                           size={24}
                        />
                     </button>
                  ) : (
                     <button
                        onClick={toggleAdd}
                        className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                     >
                        <IoAddCircleOutline className="mr-2" size={20} />
                        Add Resume
                     </button>
                  )}
               </div>

               <div className="relative z-10">
                  {isAddingResume ? (
                     <AddResume setIsAddingResume={setIsAddingResume} />
                  ) : isLoadingResume ? (
                     <ResumeSkeleton />
                  ) : (
                     <div className="space-y-4">
                        {resumes?.map((resume) => (
                           <Resume
                              key={resume.id}
                              id={resume.id}
                              title={resume.resume_title}
                              link={resume.resume}
                           />
                        ))}
                     </div>
                  )}
               </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white backdrop-blur-sm bg-opacity-95 border-0 rounded-2xl shadow-xl p-8 relative overflow-hidden">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
               
               <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center">
                     <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl mr-4 shadow-lg">
                        <MdWork className="text-white text-2xl" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                           {!isAddingExp && !isUpdatingExp
                              ? "Work Experience"
                              : (isAddingExp && "Add Experience") ||
                                (isUpdatingExp && "Update Experience")}
                        </h2>
                        <p className="text-gray-500 text-sm">Your professional journey</p>
                     </div>
                  </div>
                  {isAddingExp || isUpdatingExp ? (
                     <button
                        onClick={closeExpForm}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200"
                     >
                        <IoMdCloseCircleOutline
                           className="text-red-500 hover:text-red-600"
                           size={24}
                        />
                     </button>
                  ) : (
                     <button
                        onClick={() => {
                           setIsAddingExp(true);
                        }}
                        className="flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                     >
                        <IoAddCircleOutline className="mr-2" size={20} />
                        Add Experience
                     </button>
                  )}
               </div>
               
               <div className="relative z-10">
                  {isUpdatingExp ? (
                     <ExperienceForm
                        setIsAddingExp={setIsAddingExp}
                        updationValues={updationExp}
                        setIsUpdatingExp={setIsUpdatingExp}
                     />
                  ) : isAddingExp ? (
                     <ExperienceForm setIsAddingExp={setIsAddingExp} />
                  ) : isLoadingExp ? (
                     <ExperienceSkeleton />
                  ) : (
                     <div className="space-y-4">
                        {experiences?.map((exp) => (
                           <Experience
                              key={exp.id}
                              exp={exp}
                              setUpdation={setUpdation}
                           />
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;