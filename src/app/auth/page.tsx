"use client";

import { useState } from "react";
import AuthForm from "@/components/auth-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
    </main>
  );
}
