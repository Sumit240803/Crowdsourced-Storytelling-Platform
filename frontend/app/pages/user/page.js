"use client";
import React, { useEffect, useState } from "react";
import { me } from "@/app/services/user";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";
import Nav from "@/app/components/profile/Nav";
import { MdOutlineEmail } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { TiGroupOutline } from "react-icons/ti";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";

const User = () => {
    const showAlert = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const data = await me(token);
                if (data && data.User) {
                    setUser(data.User); // Extract the `User` object
                }
            }
        };
    
        fetchUserData();
    }, []);
    

    if (showAlert) {
        return <div className="text-4xl text-white">Login First.</div>;
    }

    if (!user) {
        return <div className="text-2xl text-white">Loading user data...</div>;
    }

    return (
        <div>
            <Nav/>
            {/* User Profile */}
            <div className="border-2 border-orange-500 rounded-xl flex flex-col md:flex-row items-center justify-center my-6 space-y-4 md:space-y-0 md:space-x-4    max-w-md md:max-w-3xl mx-auto p-3 bg-gray-900   text-white">
                {user.profilePicture && (
                    <Image
                        src={user.profilePicture}
                        alt="Profile"
                        width={100}
                        height={100}
                        onClick={''}
                        className="w-24 h-24 rounded-full border border-gray-600 cursor-pointer"
                    />
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold font-amaranth">{user.username || "N/A"}</h1>
                    <p className="text-lg font-amaranth flex items-center"><MdOutlineEmail /> {user.email || "N/A"}</p>
                </div>
            </div>

            {/* User Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-2 rounded-2xl border-orange-500 max-w-md md:max-w-3xl mx-auto p-3 bg-gray-900 text-white">
                <p>
                    <span className="font-semibold flex items-center text-gray-400 text-xl font-amaranth"> <SiStorybook className="text-3xl " color="yellow"/>Stories Written</span>{" "}
                  
                  <p className="text-xl font-bold font-pacifico">
                  {user.storiesCreated?.length || 0}
                    </p>  
                   
                </p>
                <p>
                    <span className="font-semibold flex items-center text-gray-400 text-xl font-amaranth"><TiGroupOutline className="text-3xl mx-1" color="yellow"/>Participated</span>{" "}
                    <p className="text-xl font-bold font-pacifico">
                    {user.storiesParticipated?.length || 0}
                        </p>  
                </p>
                <p>
                    <span className="font-semibold flex items-center text-xl text-gray-400 font-amaranth"><FaPeopleRoof className="text-3xl mx-1" color="yellow"/> Followers</span>{" "}
                    <p className="text-xl font-bold font-pacifico">
                    {user.followers?.length || 0}
                        </p>  
                </p>
                <p>
                    <span className="font-semibold flex items-center text-xl text-gray-400 font-amaranth"><FaPeopleGroup className="text-3xl" color="yellow mx-1"/> Following</span>{" "}
                    <p className="text-xl font-bold font-pacifico">
                    {user.following?.length || 0}
                        </p>  
                </p>
            </div>
        </div>
    );
};

export default User;
