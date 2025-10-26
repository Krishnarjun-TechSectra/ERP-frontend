"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { email: string; role: "admin" | "employee"; name: string };
type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  signUp: (data: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "employee";
  }) => Promise<void>;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const loadUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };
    loadUser();
  }, []);

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "employee";
  }) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const resData = await res.json();
    console.log(resData);
    setUser(resData.user);
    setAccessToken(resData.accessToken);
    setLoading(false);
  };

  const signIn = async (data: { email: string; password: string }) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const resData = await res.json();
    setUser(resData.user);
    setAccessToken(resData.accessToken);
    setLoading(false);
  };

  const signOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };


  console.log(user)

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
