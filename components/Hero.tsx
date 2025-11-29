"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { derivAuthUrl } from "@/lib/deriv";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("deriv_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = derivAuthUrl;
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Fastest Way to <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Move Your Money
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-400 sm:text-xl">
            Seamlessly deposit and withdraw funds between M-Pesa and Deriv. 
            Instant processing, best rates, and bank-grade security.
          </p>
          
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-6 text-lg"
              onClick={handleGetStarted}
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </Button>
            {!isLoggedIn && (
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-6 text-lg"
                onClick={() => window.location.href = derivAuthUrl}
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Operational 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Instant Processing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
