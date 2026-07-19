"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-panel border-t border-border py-6 px-4 mt-auto text-xs text-text-secondary shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© {new Date().getFullYear()} Decimal Lens. All rights reserved.</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
          <Link href="/faq" className="hover:text-text-primary transition-colors">
            FAQs
          </Link>
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/about" className="hover:text-text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
