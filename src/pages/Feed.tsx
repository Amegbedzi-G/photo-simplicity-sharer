
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import CreatePostButton from "@/components/CreatePostButton";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";

// Mock post data (in a real app, this would be fetched from the server)
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    userId: "user1",
    username: "alex_doe",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    caption: "Enjoying the beautiful sunset today 🌅",
    createdAt: "2023-07-10T15:00:00Z",
  },
  {
    id: "2",
    userId: "user2",
    username: "sam_smith",
    imageUrl: "https://images.unsplash.com/photo-1558981852-426c6c22a060",
    caption: "Weekend getaway with friends",
    createdAt: "2023-07-08T10:30:00Z",
  },
  {
    id: "3",
    userId: "user3",
    username: "taylor_photo",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    createdAt: "2023-07-05T18:45:00Z",
  },
];

const Feed: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [user, isLoading, navigate]);
  
  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  
  return (
    <div className="pt-20 pb-10 page-enter">
      <div className="container mx-auto max-w-xl px-4">
        <h1 className="sr-only">Photo Feed</h1>
        
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-secondary"></div>
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-secondary rounded mb-2"></div>
                    <div className="h-3 w-16 bg-secondary rounded"></div>
                  </div>
                </div>
                <div className="aspect-square bg-secondary rounded-md mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No posts yet. Be the first to share a photo!</p>
              </div>
            )}
          </div>
        )}
        
        <CreatePostButton onPostCreated={handlePostCreated} />
      </div>
    </div>
  );
};

export default Feed;
