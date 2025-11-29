import Link from "next/link";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Derisa</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Seamlessly deposit and withdraw from your Deriv account using M-Pesa. Fast, secure, and reliable.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Security</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
              <li><Link href="#" className="hover:text-white">Terms</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white">Facebook</Link></li>
              <li><Link href="#" className="hover:text-white">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Derisa. All rights reserved. Not affiliated with Deriv.
        </div>
      </div>
    </footer>
  );
}
