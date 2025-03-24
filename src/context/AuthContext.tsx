
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { useToast } from "@/components/ui/use-toast";

// Mock user data (in a real app, this would be server-side)
const MOCK_USERS: Record<string, { username: string; password: string }> = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (error) {
        console.error("Failed to parse auth data", error);
        localStorage.removeItem("auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating server validation
      const userData = MOCK_USERS[username];
      
      if (!userData || userData.password !== password) {
        throw new Error("Invalid credentials");
      }
      
      // Create user profile
      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem("auth", JSON.stringify(newUser));
      toast({
        title: "Welcome back!",
        description: `You've successfully logged in as ${username}`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "The username or password is incorrect",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if username is already taken
      if (MOCK_USERS[username]) {
        throw new Error("Username already taken");
      }
      
      // Store in our mock database
      MOCK_USERS[username] = { username, password };
      
      // Create user profile
      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem("auth", JSON.stringify(newUser));
      toast({
        title: "Account created",
        description: "Welcome to Simplicity - your account has been created successfully!",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: (error as Error).message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    toast({
      title: "You've been logged out",
      description: "Come back soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
