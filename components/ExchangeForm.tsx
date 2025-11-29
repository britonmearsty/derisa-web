"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Smartphone, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { initiateSTKPush, initiateB2C } from "@/lib/lipana";
import { derivAuthUrl } from "@/lib/deriv";

type TransactionType = "deposit" | "withdraw";

export default function ExchangeForm() {
  const [type, setType] = useState<TransactionType>("deposit");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("deriv_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      window.location.href = derivAuthUrl;
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      if (type === "deposit") {
        await initiateSTKPush(phone, Number(amount));
        setStatus({ type: 'success', message: 'STK Push sent! Check your phone.' });
      } else {
        await initiateB2C(phone, Number(amount));
        setStatus({ type: 'success', message: 'Withdrawal initiated! Funds will arrive shortly.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Transaction failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          {type === "deposit" ? "Deposit to Deriv" : "Withdraw from Deriv"}
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Fast and secure transactions via M-Pesa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex rounded-lg bg-white/5 p-1">
          <button
            onClick={() => setType("deposit")}
            className={cn(
              "flex-1 rounded-md py-2 text-sm font-medium transition-all",
              type === "deposit"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-gray-400 hover:text-white"
            )}
          >
            Deposit
          </button>
          <button
            onClick={() => setType("withdraw")}
            className={cn(
              "flex-1 rounded-md py-2 text-sm font-medium transition-all",
              type === "withdraw"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-gray-400 hover:text-white"
            )}
          >
            Withdraw
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Amount (USD)</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <Input
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">M-Pesa Number</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <Input
                type="tel"
                placeholder="2547..."
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {status && (
            <div className={cn(
              "rounded-md p-3 text-sm",
              status.type === 'success' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            )}>
              {status.message}
            </div>
          )}

          <div className="pt-2">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
              <span>Exchange Rate</span>
              <span className="font-medium text-white">1 USD = 129 KES</span>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isLoggedIn ? (type === "deposit" ? "Pay with M-Pesa" : "Withdraw to M-Pesa") : "Login to Continue"}
                  {!loading && <ArrowRightLeft className="ml-2 h-5 w-5" />}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
