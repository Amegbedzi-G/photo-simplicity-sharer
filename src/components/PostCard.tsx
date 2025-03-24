
import React, { useState } from "react";
import { User } from "lucide-react";
import { Post } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="overflow-hidden card-hover mb-6 glass animate-fade-in">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {post.profilePicture ? (
              <img
                src={post.profilePicture}
                alt={post.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{post.username}</h3>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        
        <div className="aspect-square relative bg-secondary">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse-soft">
              <span className="sr-only">Loading image...</span>
            </div>
          )}
          <img
            src={post.imageUrl}
            alt={post.caption || "Post image"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </CardContent>
      
      {post.caption && (
        <CardFooter className="p-4">
          <p className="text-sm">
            <span className="font-medium">{post.username}</span>{" "}
            {post.caption}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
