"use client";

import React, { FC, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

const PostCreator: FC = () => {
  const { user } = useAuth();

  // State for the form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Poem' | 'Photo' | 'Reflection'>('Photo');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !imageFile || !user) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Upload the image to Firebase Storage
      const imageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 2. Save the post data (including the image URL) to Firestore
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        category: category,
        imageUrl: imageUrl,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: serverTimestamp(),
      });
      
      setSuccess("Post created successfully!");
      // Reset form
      setTitle('');
      setContent('');
      setCategory('Photo');
      setImageFile(null);

    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Create New Post</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-600 mb-1">Content (Subheading/Description)</label>
        <textarea 
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option>Photo</option>
          <option>Poem</option>
          <option>Reflection</option>
        </select>
      </div>

      <div>
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-600 mb-1">Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
                <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">{imageFile ? imageFile.name : 'PNG, JPG, GIF up to 10MB'}</p>
          </div>
        </div>
      </div>

      <div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center px-4 py-3 border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Post'}
        </button>
      </div>
      
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {success && <p className="text-sm text-green-600 text-center">{success}</p>}
    </form>
  );
};

export default PostCreator;
