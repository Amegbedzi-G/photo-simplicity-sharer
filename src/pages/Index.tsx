
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/feed");
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="text-center max-w-2xl">
        <div className="mx-auto rounded-full bg-primary bg-opacity-10 p-5 inline-flex mb-8">
          <Camera className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-4xl font-medium tracking-tight mb-4">
          Simplicity
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          A minimal photo sharing platform focused on simplicity and beauty
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
