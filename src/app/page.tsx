// pages/dashboard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  console.log("User in Dashboard:", user);

  if (!user) return <div>No user Found...</div>;

  return <div>Welcome Admin {user?.email}</div>;
}
