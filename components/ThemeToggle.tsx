'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'minimal';
}

export function ThemeToggle({
  className = '',
  variant = 'pill',
}: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR placeholder to prevent layout shifts & hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-black/10 dark:bg-white/10 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Variant 1: Sleek Pill Switch (Default & most visual/satisfying)
  if (variant === 'pill') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode (Ctrl+Shift+D)' : 'Switch to Dark Mode (Ctrl+Shift+D)'}
        className={`group relative inline-flex items-center justify-between w-13 h-7 sm:w-15 sm:h-7.5 p-0.5 sm:p-1 rounded-full cursor-pointer select-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sky-400 active:scale-95 ${
          isDark
            ? 'bg-slate-800/90 border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
            : 'bg-white/30 hover:bg-white/40 border border-white/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]'
        } ${className}`}
      >
        {/* Sun Icon slot (Left) */}
        <span
          className={`flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5 transition-all duration-300 z-10 ${
            !isDark ? 'text-amber-500 scale-100 opacity-100' : 'text-slate-400 scale-75 opacity-40 group-hover:opacity-75'
          }`}
        >
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
        </span>

        {/* Moon Icon slot (Right) */}
        <span
          className={`flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5 transition-all duration-300 z-10 ${
            isDark ? 'text-cyan-300 scale-100 opacity-100' : 'text-white/60 scale-75 opacity-40 group-hover:opacity-75'
          }`}
        >
          <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
        </span>

        {/* Sliding Thumb Knob with dynamic glow */}
        <span
          className={`absolute top-0.5 sm:top-1 w-6 h-6 sm:w-5.5 sm:h-5.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center pointer-events-none shadow-md ${
            isDark
              ? 'left-[calc(100%-1.65rem)] sm:left-[calc(100%-1.65rem)] bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.6)]'
              : 'left-0.5 sm:left-1 bg-white text-amber-500 shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-white fill-white/30 animate-in fade-in zoom-in-75 duration-200" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400/40 animate-in fade-in zoom-in-75 duration-200" />
          )}
        </span>
      </button>
    );
  }

  // Variant 2: Minimal Circular Toggle Button
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`btn-press relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 cursor-pointer shadow-xs ${
        isDark
          ? 'bg-slate-800 text-cyan-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white shadow-[0_0_10px_rgba(6,182,212,0.25)]'
          : 'bg-white hover:bg-slate-50 text-[#0b3c68] border border-white/40 hover:shadow-md'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-[#0b3c68] hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
