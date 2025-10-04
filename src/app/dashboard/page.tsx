"use client";

import React, { FC } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

// 1. Import your dashboard components
import PostCreator from '@/lib/components/dashboard/PostCreator';
import PostManager from '@/lib/components/dashboard/PostManager';
import UserManager from '@/lib/components/dashboard/UserManager';

const AdminDashboard: FC = () => {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  // --- Page Protection ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
      </div>
    );
  }

  // A user must be logged in to see the dashboard at all.
  if (!user) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">You must be logged in to view this page.</p>
        <button onClick={() => router.push('/')} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Return to Home
        </button>
      </div>
    );
  }

  // --- Dashboard UI ---
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome, {user.displayName}. Your current role is: <span className="font-semibold text-blue-600 capitalize">{userRole}</span></p>
        </div>
        
        {/* The PostCreator is available to all logged-in users */}
        <PostCreator />

        {/* The PostManager is also available to all logged-in users */}
        <PostManager />

        {/* The UserManager is ONLY rendered if the user's role is 'superadmin' */}
        {(userRole === 'superadmin') && (
          <UserManager />
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
