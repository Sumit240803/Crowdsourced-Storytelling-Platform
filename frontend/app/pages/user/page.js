"use client";
import React, { useEffect, useState } from "react";
import { me } from "@/app/services/user";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";
import Nav from "@/app/components/profile/Nav";
import { MdOutlineEmail } from "react-icons/md";

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
            <div className="flex flex-col md:flex-row items-center justify-center my-6 space-y-4 md:space-y-0 md:space-x-4  rounded  max-w-md md:max-w-3xl mx-auto p-3 bg-white shadow-sm shadow-gray-300 text-black">
                {user.profilePicture && (
                    <Image
                        src={user.profilePicture}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full border border-gray-600"
                    />
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold font-amaranth">{user.username || "N/A"}</h1>
                    <p className="text-lg font-amaranth"><MdOutlineEmail /> {user.email || "N/A"}</p>
                </div>
            </div>

            {/* User Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-2 rounded-2xl border-orange-500 max-w-md md:max-w-3xl mx-auto p-3 bg-yellow-200 text-black">
                <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {user.storiesCreated?.length || 0}
                </p>
                <p>
                    <span className="font-semibold">Participated:</span>{" "}
                    {user.storiesParticipated?.length || 0}
                </p>
                <p>
                    <span className="font-semibold">Followers:</span>{" "}
                    {user.followers?.length || 0}
                </p>
                <p>
                    <span className="font-semibold">Following:</span>{" "}
                    {user.following?.length || 0}
                </p>
            </div>
        </div>
    );
};

export default User;
