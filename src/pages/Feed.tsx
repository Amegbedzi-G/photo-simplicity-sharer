
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import CreatePostButton from "@/components/CreatePostButton";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import { supabase } from "@/integrations/supabase/client";

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
    
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id,
            image_url,
            caption,
            created_at,
            user_id,
            profiles:user_id (username, profile_picture)
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedPosts: Post[] = data.map(post => ({
            id: post.id,
            userId: post.user_id,
            username: post.profiles.username,
            profilePicture: post.profiles.profile_picture,
            imageUrl: post.image_url,
            caption: post.caption || undefined,
            createdAt: post.created_at,
          }));
          
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchPosts();
    }
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
