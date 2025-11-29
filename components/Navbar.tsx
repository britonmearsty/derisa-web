"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { derivAuthUrl } from "@/lib/deriv";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("deriv_token");
    const acct = localStorage.getItem("deriv_account");
    if (token && acct) {
      setIsLoggedIn(true);
      setAccount(acct);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("deriv_token");
    localStorage.removeItem("deriv_account");
    setIsLoggedIn(false);
    setAccount(null);
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Derisa</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {isLoggedIn ? (
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
              <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white font-mono">{account}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden sm:flex" onClick={() => window.location.href = derivAuthUrl}>
                Sign In
              </Button>
              <Button onClick={() => window.location.href = derivAuthUrl}>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
