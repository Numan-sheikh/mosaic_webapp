"use client";

import React, { FC, useState, useEffect } from 'react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Loader2, ShieldCheck, UserCog } from 'lucide-react';

// --- TypeScript Type for a User Document ---
interface ManagedUser {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  createdAt: Timestamp;
}

const UserManager: FC = () => {
    // Get the current superadmin's user object to prevent self-role-change
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<ManagedUser[]>([]);
    const [loading, setLoading] = useState(true);

    const possibleRoles: UserRole[] = ['user', 'editor', 'subadmin', 'admin', 'superadmin'];

    // This effect fetches all users from the 'users' collection
    useEffect(() => {
        setLoading(true);
        const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
            const usersData: ManagedUser[] = [];
            querySnapshot.forEach((doc) => {
                // Ensure the document has a role before adding it
                if (doc.data().role) {
                    usersData.push({ id: doc.id, ...doc.data() } as ManagedUser);
                }
            });
            setUsers(usersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    // Function to handle changing a user's role
    const handleRoleChange = async (userId: string, newRole: UserRole) => {
        const userDocRef = doc(db, "users", userId);
        try {
            await updateDoc(userDocRef, {
                role: newRole
            });
        } catch (error) {
            console.error("Error updating user role:", error);
            alert("Failed to update role. Check console and Firestore rules.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
                 <UserCog className="w-8 h-8 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-700">Manage User Roles</h2>
            </div>
            <div className="mt-4 border-t pt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {users.map((user) => (
                            <li key={user.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="truncate mb-2 md:mb-0">
                                    <p className="font-semibold text-gray-800 truncate">{user.displayName}</p>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* --- THE FIX: Wrap the icon in a span and move the title prop --- */}
                                    {user.id === currentUser?.uid && (
                                      <span title="This is you">
                                        <ShieldCheck className="w-5 h-5 text-green-500" />
                                      </span>
                                    )}
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                        // Prevent a superadmin from accidentally demoting themselves
                                        disabled={user.id === currentUser?.uid}
                                        className="w-full md:w-auto px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                    >
                                        {possibleRoles.map(role => (
                                            <option key={role} value={role} className="capitalize">{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserManager;

