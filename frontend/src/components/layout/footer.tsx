// src/components/footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold">Market O'Clock</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connecting suppliers and retailers with innovative marketplace solutions.
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-sm font-semibold">Marketplace</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-muted-foreground hover:text-foreground">
                  Popular Items
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact and Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>support@marketoclock.com | Nairobi, Kenya</p>
          <p>© {new Date().getFullYear()} Market O'Clock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}