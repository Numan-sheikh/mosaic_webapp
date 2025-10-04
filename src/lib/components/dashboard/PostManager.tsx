"use client";

import React, { FC, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';

// --- TypeScript Type for a Post Document ---
interface Post {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  createdAt: Timestamp;
}

const PostManager: FC = () => {
    const { user, userRole } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // This effect fetches all posts from Firestore in real-time
    useEffect(() => {
        setLoading(true);
        const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
            const postsData: Post[] = [];
            querySnapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() } as Post);
            });
            setPosts(postsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []);

    // Function to handle deleting a post
    const handleDelete = async (postId: string) => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "posts", postId));
                // Note: The real-time listener will automatically update the UI.
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post.");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Manage Posts</h2>
            <div className="mt-4 border-t pt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <p className="text-gray-500 text-center">No posts yet. Create one above to get started!</p>
                ) : (
                    <ul className="space-y-4">
                        {posts.map((post) => {
                            // Determine if the current user has permission to delete this post
                            const canDelete = user?.uid === post.authorId || 
                                              ['admin', 'superadmin', 'editor', 'subadmin'].includes(userRole || '');
                            
                            return (
                                <li key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <Image src={post.imageUrl} alt={post.title} width={64} height={64} className="rounded-md object-cover w-16 h-16 shrink-0" />
                                        <div className="truncate">
                                            <p className="font-semibold text-gray-800 truncate">{post.title}</p>
                                            <p className="text-sm text-gray-500">by {post.authorName}</p>
                                        </div>
                                    </div>
                                    {/* Only render the delete button if the user has permission */}
                                    {canDelete && (
                                        <button 
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors shrink-0 ml-4"
                                            aria-label={`Delete post titled ${post.title}`}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PostManager;

