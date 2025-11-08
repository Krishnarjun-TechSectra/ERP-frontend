"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

interface SignInFormProps {
  onToggleToSignUp: () => void;
}

export default function SignInForm({ onToggleToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <InputGroup>
                <InputGroupAddon align={"inline-start"}>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </InputGroup>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <InputGroup>
                <InputGroupAddon align={"inline-start"}>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon-xs"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
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
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle to Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={onToggleToSignUp}
                className="text-primary font-semibold hover:underline transition"
              >
                Sign up
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
