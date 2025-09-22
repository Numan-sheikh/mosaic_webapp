import React, { FC } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA ---
// In a real application, you would fetch this from your backend API
// using the `slug` parameter.
const allPosts = [
  // Poems
  { id: 'p1', type: 'Poem', title: "The Willow's Secret", img: 'https://placehold.co/1200x800/a3e635/171717?text=Poem+1', content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 'p2', type: 'Poem', title: "Second Poem", img: 'https://placehold.co/1200x800/a3e635/171717?text=Poem+2', content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  // ... add all other items from your TabView here
  
  // Photos
  { id: 'ph1', type: 'Photo', title: "City Corner", img: 'https://placehold.co/1200x800/60a5fa/171717?text=Photo+1', content: "A snapshot of urban life, finding beauty in the mundane." },
  { id: 'ph2', type: 'Photo', title: "Second Photo", img: 'https://placehold.co/1200x800/60a5fa/171717?text=Photo+2', content: "Another moment captured in time." },
   // ... add all other items
];

// --- DYNAMIC PAGE COMPONENT ---
interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage: FC<PostPageProps> = ({ params }) => {
  const { slug } = params;

  // Find the post data that matches the slug from the URL
  const post = allPosts.find(p => p.id === slug);

  // Handle case where post is not found
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Post Not Found</h1>
        <Link href="/" className="mt-4 text-lg text-blue-500 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8">
          <ArrowLeft size={20} />
          Back to Collection
        </Link>

        <article>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image src={post.img} alt={post.title} layout="fill" className="object-cover" />
          </div>
          <span className="text-sm font-semibold text-blue-500 uppercase">{post.type}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-2 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {post.content}
          </p>
        </article>
      </div>
    </main>
  );
};

export default PostPage;
