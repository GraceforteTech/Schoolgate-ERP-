import { createFileRoute, Navigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { checkUserTenants } from "@/lib/onboarding.functions";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const [destination, setDestination] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setDestination("/landing");
      } else {
        try {
          const { hasTenants } = await checkUserTenants({ data: { userId: session.user.id } });
          setDestination(hasTenants ? "/enterprise" : "/onboarding");
        } catch (err) {
          console.error("Auth check failed:", err);
          setDestination("/onboarding");
        }
      }
      setLoading(false);
    };

    checkStatus();
  }, []);

  if (loading || !destination) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-schoolgate-green border-t-transparent mx-auto"></div>
      </div>
    );
  }

  return <Navigate to={destination as any} replace />;
}
