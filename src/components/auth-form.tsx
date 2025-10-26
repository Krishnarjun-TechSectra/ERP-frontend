"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export default function AuthForm({ isLogin, setIsLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      try {
        const result = await signIn({ email, password });
      } catch (error) {
        toast.error("Failed to sign in. Please check your credentials.");
      }
    } else {
      try {
        const result = await signUp({ email, password, name, role: "employee" });
        console.log(result)
      } catch (error) {
        console.error(error);
        toast.error("Failed to sign up. Please try again.");
      }
    }
    setLoading(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to your account to continue"
              : "Join us today and get started"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline transition"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        By continuing, you agree to our{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
