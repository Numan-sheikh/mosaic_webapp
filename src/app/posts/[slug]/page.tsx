import React, { FC } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Import notFound for error handling

// Define the shape of a post document from Firestore
interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  authorId: string;
  createdAt: Timestamp;
}

// Define the shape of the props the page will receive
interface PostPageProps {
  params: {
    slug: string;
  };
}

// The component is now an async Server Component
const PostPage: FC<PostPageProps> = async ({ params }) => {
  const { slug } = params;

  // --- Direct Data Fetching on the Server ---
  const postDocRef = doc(db, 'posts', slug);
  const postDocSnap = await getDoc(postDocRef);

  // If the post doesn't exist, render the not-found page
  if (!postDocSnap.exists()) {
    notFound();
  }

  const post = { id: postDocSnap.id, ...postDocSnap.data() } as Post;

  // --- Render the Post ---
  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8">
          <ArrowLeft size={20} />
          Back to Collection
        </Link>

        <article>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image src={post.imageUrl} alt={post.title} layout="fill" className="object-cover" />
          </div>
          <span className="text-sm font-semibold text-blue-500 uppercase">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-2 mb-4">{post.title}</h1>
          {/* whitespace-pre-wrap preserves line breaks from your textarea */}
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </article>
      </div>
    </main>
  );
};

export default PostPage;

