
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "@/components/UserProfile";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }
    
    const fetchUserPosts = async () => {
      if (!user) return;
      
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
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
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
          
          setUserPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchUserPosts();
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-10 page-enter">
      <div className="container mx-auto px-4">
        <UserProfile user={user} postCount={userPosts.length} />
        
        <div className="mt-10 max-w-xl mx-auto">
          <h2 className="text-xl font-medium mb-6">Your Posts</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-6">
              {[1, 2].map((n) => (
                <div key={n} className="aspect-square bg-secondary rounded-md"></div>
              ))}
            </div>
          ) : (
            <div>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven't shared any photos yet
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
