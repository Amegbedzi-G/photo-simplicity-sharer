
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Camera, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 px-6 animate-slide-down">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Camera className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="text-xl font-medium tracking-tight">Simplicity</span>
        </Link>
        
        {user ? (
          <div className="flex items-center gap-3">
            {location.pathname !== "/feed" && (
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/feed" className="flex items-center gap-2">
                  <span>Feed</span>
                </Link>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-lg bg-white/95">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/auth">
              <span>Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
