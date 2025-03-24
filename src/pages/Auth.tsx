
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

const Auth: React.FC = () => {
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
    <div className="min-h-screen flex items-center justify-center p-6 page-enter">
      <AuthForm />
    </div>
  );
};

export default Auth;
