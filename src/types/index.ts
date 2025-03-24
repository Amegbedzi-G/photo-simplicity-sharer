
export interface User {
  id: string;
  username: string;
  profilePicture?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  profilePicture?: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
