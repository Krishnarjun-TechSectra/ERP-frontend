// app/providers/AuthProvider.tsx  (or /context/AuthContext.tsx)
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import {toast } from "react-toastify"

type User = any; // adapt shape if you want: { id, email, user_metadata }
const AuthContext = createContext({
  user: null as User | null,
  loading: true,
  signUp: async (email: string, password: string, metadata?: any) => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // initial session check
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });

      if (error) throw error;

      setUser(data.user ?? null);

      toast.success("Account created successfully!", {
        icon: <CheckCircle2 />,
      });

      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
      
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(data.user ?? null);

      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
