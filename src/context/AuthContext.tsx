
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Get the user profile from the profiles table
          const fetchProfile = async () => {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (data) {
              setUser({
                id: data.id,
                username: data.username,
                profilePicture: data.profile_picture,
                createdAt: data.created_at
              });
            } else if (error) {
              console.error('Error fetching user profile:', error);
              setUser(null);
            }
          };

          fetchProfile();
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        // Get the user profile from the profiles table
        const fetchProfile = async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (data) {
            setUser({
              id: data.id,
              username: data.username,
              profilePicture: data.profile_picture,
              createdAt: data.created_at
            });
          } else if (error) {
            console.error('Error fetching user profile:', error);
            setUser(null);
          }
          
          setIsLoading(false);
        };

        fetchProfile();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@example.com`, // Using username as email for simplicity
        password: password
      });
      
      if (error) throw error;
      
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
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();
        
      if (existingUser) {
        throw new Error("Username already taken");
      }
      
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: `${username}@example.com`, // Using username as email for simplicity
        password: password,
        options: {
          data: {
            username: username
          }
        }
      });
      
      if (error) throw error;
      
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
    supabase.auth.signOut().then(() => {
      setUser(null);
      setSession(null);
      toast({
        title: "You've been logged out",
        description: "Come back soon!",
      });
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
