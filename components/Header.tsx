"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Command } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

interface HeaderProps {
  onResetDashboard?: () => void;
}

export function Header({ onResetDashboard }: HeaderProps = {}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-14 bg-panel border-b border-border flex items-center justify-between px-3 sm:px-6 z-20 shrink-0 shadow-2xs relative"
    >
      <Link 
        href="/"
        onClick={() => {
          if (onResetDashboard) {
            onResetDashboard();
          }
        }}
        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
      >
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-8 h-8 rounded-lg bg-accent-navy/10 dark:bg-blue-500/20 border border-accent-navy/20 dark:border-blue-500/30 flex items-center justify-center text-accent-navy dark:text-blue-400 group-hover:bg-accent-navy group-hover:text-white transition-colors duration-200"
        >
          <Database className="w-4 h-4" />
        </motion.div>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-text-primary tracking-tight font-sans text-sm sm:text-base group-hover:text-accent-navy dark:group-hover:text-blue-400 transition-colors">
            Decimal Lens
          </span>
          
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono bg-border/60 dark:bg-slate-800 px-2 py-0.5 rounded-full text-text-secondary dark:text-slate-300 font-semibold border border-border/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            v5.0 Audit
          </motion.span>
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="flex items-center gap-4 sm:gap-6 text-xs font-semibold text-text-secondary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative py-1 text-text-secondary hover:text-text-primary transition-colors font-sans"
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="headerNavLine" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-navy dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search Palette Shortcut Micro-badge */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true });
            window.dispatchEvent(event);
          }}
          className="hidden md:flex items-center gap-1.5 text-[10px] font-mono bg-bg dark:bg-slate-800 text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-md border border-border cursor-pointer transition-all shadow-2xs"
          title="Open Search & Citation Command Palette (Ctrl + K)"
        >
          <Command className="w-3 h-3 text-accent-navy dark:text-blue-400" />
          <span>K</span>
        </motion.button>

        <ThemeToggle />
      </div>
    </motion.header>
  );
}
