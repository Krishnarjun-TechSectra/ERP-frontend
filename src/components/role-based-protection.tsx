// src/hoc/withRoleProtection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // for Next.js routing
import { useAuth } from "../../context/auth-context";

interface User {
  id: string;
  name: string;
  role: string;
}

interface WithRoleProtectionOptions {
  allowedRoles: string[];
}

export function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles }: WithRoleProtectionOptions,
) {
  const RoleProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    if (loading) {
      // Still verifying auth status
      return <div className="text-center mt-8">Checking permissions...</div>;
    }

    if (!user) {
      // User not logged in
      return <div className="text-center mt-8">Please log in to continue.</div>;
    }

    if (!allowedRoles.includes(user.user_metadata.role)) {
      // Role not authorized
      return (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              You are not authorized
            </h2>
            <p className="text-gray-600">
              You don’t have permission to view this page.
            </p>
          </div>
        </div>
      );
    }

    // ✅ Authorized — render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return RoleProtectedComponent;
}
