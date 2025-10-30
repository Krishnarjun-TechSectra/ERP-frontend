// pages/dashboard.tsx
"use client";
import { useAuth } from "../../context/auth-context";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      {user ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Welcome, {user.email}!
          </h1>
          <p className="text-gray-600 mb-6">
            You have successfully logged in. Explore your dashboard and manage
            your account.
          </p>
          <div className="space-x-6">
            <Button onClick={signOut} className="">
              Sign Out
            </Button>
            <Button
            variant={'outline'}
              onClick={() => (window.location.href = "/task-manager/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            No User Logged In
          </h1>
          <p className="text-gray-600">
            Please log in to access your dashboard.
          </p>
          <Button onClick={() => (window.location.href = "/auth")}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}
