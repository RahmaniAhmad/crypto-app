"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { FaCalculator, FaMoon, FaSun } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import TradeCalculator from "@/features/tradeCalculator/TradeCalculator";

export function MainNavigation() {
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              onClick={onOpen}
              aria-label="Open trade calculator"
              title="Trade Calculator"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              <FaCalculator size={17} />
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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-xl">Trade Calculator</ModalHeader>

              <ModalBody className="px-0 pb-0">
                <TradeCalculator />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
