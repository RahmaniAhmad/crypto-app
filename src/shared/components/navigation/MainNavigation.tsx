"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { FaCalculator, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import TradeCalculator from "@/features/tradeCalculator/TradeCalculator";

export function MainNavigation() {
  const { theme, setTheme } = useTheme();
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-10 border-b bg-white bg-opacity-50 backdrop-blur-md dark:border-slate-500 dark:bg-gray-900 dark:text-gray-400">
        <div className="flex items-center justify-between px-4 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TradePulse
          </Link>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              aria-label="Open trade calculator"
              title="Trade Calculator"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <FaCalculator size={16} />
            </button>

            <button
              type="button"
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          </div>
        </div>
      </div>

      {calculatorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setCalculatorOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCalculatorOpen(false)}
              aria-label="Close calculator"
              className="absolute right-4 top-4 z-10 rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <FaTimes size={16} />
            </button>

            <TradeCalculator />
          </div>
        </div>
      )}
    </>
  );
}
