"use client";

import Link from "next/link";
import { Database } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-14 bg-panel border-b border-border flex items-center justify-between px-3 sm:px-6 z-10 shrink-0"
    >
      <Link 
        href="/"
        className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group"
      >
        <Database className="w-5 h-5 text-accent-navy group-hover:scale-105 transition-transform" />
        <span className="font-semibold text-text-primary tracking-tight font-sans text-sm sm:text-base group-hover:text-accent-navy transition-colors">Decimal Lens</span>
        <span className="hidden sm:inline-block text-[10px] uppercase font-mono bg-border px-1.5 py-0.5 rounded text-text-secondary tracking-widest">
          v5.0 Audit
        </span>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-text-secondary">
          <Link href="/about" className="hover:text-text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
