import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';
import { FaBars, FaTimes } from 'react-icons/fa';

const ProfileLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                {/* Profile Header - Shows user info */}
                <ProfileHeader />

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                        <span className="font-semibold">Menu</span>
                    </button>
                </div>

                {/* Main Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar - Desktop: Always visible, Mobile: Toggleable */}
                    <div
                        className={`${isSidebarOpen ? 'block' : 'hidden'
                            } lg:block lg:w-64 flex-shrink-0`}
                    >
                        <ProfileSidebar onItemClick={() => setIsSidebarOpen(false)} />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
