"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, User, Wallet } from "lucide-react";
import ExchangeForm from "@/components/ExchangeForm";
import { DerivAPI } from "@/lib/deriv";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("deriv_token");
    const acct = localStorage.getItem("deriv_account");

    if (!token || !acct) {
      router.push("/");
      return;
    }

    setAccount(acct);

    // Fetch balance
    const api = new DerivAPI(token);
    api.getBalance()
      .then((response) => {
        if (response.balance) {
          setBalance(response.balance.balance);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch balance:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("deriv_token");
    localStorage.removeItem("deriv_account");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Derisa</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Manage your Deriv account and M-Pesa transactions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Account Info */}
          <div className="lg:col-span-1">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Account ID</p>
                  <p className="font-mono text-sm text-white">{account}</p>
                </div>
                {balance !== null && (
                  <div>
                    <p className="text-sm text-gray-400">Balance</p>
                    <p className="text-2xl font-bold text-white">${balance.toFixed(2)}</p>
                  </div>
                )}
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Connected to Deriv</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Form */}
          <div className="lg:col-span-2">
            <ExchangeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
