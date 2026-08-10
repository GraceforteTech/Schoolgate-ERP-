import { createFileRoute, Navigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        window.location.href = "/enterprise";
      }
    });

    const checkSession = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
      }
    };

    checkSession();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-rose-600">Authentication Error</h1>
          <p className="mt-2 text-slate-600">{error}</p>
          <a href="/auth/login" className="mt-4 inline-block text-schoolgate-green hover:underline">
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-schoolgate-green border-t-transparent mx-auto"></div>
        <p className="mt-4 text-slate-600 font-medium">Finalizing sign in...</p>
      </div>
    </div>
  );
}
