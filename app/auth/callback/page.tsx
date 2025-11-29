"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token1 = searchParams.get("token1");
    const acct1 = searchParams.get("acct1");

    if (token1 && acct1) {
      // Store in localStorage (or better, a secure cookie/session)
      localStorage.setItem("deriv_token", token1);
      localStorage.setItem("deriv_account", acct1);
      
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      // Handle error
      console.error("No token found");
      setTimeout(() => router.push("/"), 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-white">Authenticating...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
