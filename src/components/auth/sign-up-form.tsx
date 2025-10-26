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

import { Label } from "@radix-ui/react-label";
import { useAuth } from "../../../context/auth-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SignUpFormProps {
  onToggleToSignIn: () => void;
}

export default function SignUpForm({ onToggleToSignIn }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signUp(email, password, {
      role: isAdmin ? "admin" : "employee",
      name,
    });
    setLoading(false);
    setEmail("");
    setPassword("");
    setName("");
    setIsAdmin(false);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>Join us today and get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
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
              <Label htmlFor="password">Password</Label>
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

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  id="admin-role"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-4 h-4 rounded border-input"
                />
                <Label
                  htmlFor="admin-role"
                  className="font-normal cursor-pointer"
                >
                  Sign up as Admin
                </Label>
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
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle to Sign In */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={onToggleToSignIn}
                className="text-primary font-semibold hover:underline transition"
              >
                Sign in
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
