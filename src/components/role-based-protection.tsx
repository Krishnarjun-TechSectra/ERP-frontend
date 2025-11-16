// src/hoc/withRoleProtection.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";
import { Loader2, Lock, ShieldAlert } from "lucide-react";

interface WithRoleProtectionOptions {
  allowedRoles: string[];
}

export function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles }: WithRoleProtectionOptions
) {
  const RoleProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        const timeout = setTimeout(() => {
          router.push("/auth");
        }, 1500); // optional delay to show message

        return () => clearTimeout(timeout);
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className="h-screen flex justify-center items-center"><Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />;</div>
    }

    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="bg-white p-8  text-center">
            <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />

            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              You're not logged in
            </h2>

            <p className="text-gray-500 mb-4">
              Redirecting you to the login page...
            </p>

            <Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" />
          </div>
        </div>
      );
    }

    if (!allowedRoles.includes(user.user_metadata.role)) {
      return (
        <div className="flex items-center justify-center mt-20">
          <div className="bg-white p-8 text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />

            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              You are not authorized
            </h2>

            <p className="text-gray-600">
              You don&apos;t have permission to view this page.
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return RoleProtectedComponent;
}
