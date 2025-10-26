"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {isSignIn ? (
        <SignInForm onToggleToSignUp={() => setIsSignIn(false)} />
      ) : (
        <SignUpForm onToggleToSignIn={() => setIsSignIn(true)} />
      )}
    </div>
  );
}
