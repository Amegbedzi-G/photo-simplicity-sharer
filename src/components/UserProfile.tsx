
import React from "react";
import { User } from "@/types";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface UserProfileProps {
  user: User;
  postCount: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, postCount }) => {
  const { logout } = useAuth();
  
  return (
    <div className="w-full mx-auto max-w-xl animate-slide-up">
      <div className="text-center mb-10">
        <div className="h-24 w-24 mx-auto rounded-full overflow-hidden bg-secondary flex items-center justify-center mb-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIcon className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        
        <h1 className="text-2xl font-medium mb-1">{user.username}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
        
        <div className="flex items-center justify-center gap-8 mb-6">
          <div>
            <p className="text-xl font-medium">{postCount}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="rounded-full"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
