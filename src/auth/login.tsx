"use client";

import Feature from "@/components/feature";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { auth } from "@/lib/firebase";
import { ROUTES } from "@/utils/auth";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useAuth();
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')

  useEffect(() => {
    if (user) {
      const destination = returnUrl || ROUTES.DASHBOARD;
      router.push(destination);
    }
  }, [user, returnUrl, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err?.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Feature>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleEmailSignIn} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Sign in</h2>

          {error && <div className="text-destructive text-sm">{error}</div>}
          {user && JSON.stringify(user)}

          <div>
            <label className="text-sm block mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <Button type="button" variant="outline" onClick={handleGoogleSignIn} disabled={loading}>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </Feature>
  );
}
