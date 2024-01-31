"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const TopMenu = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-b dark:border-b-slate-500 sticky top-0 left-0 right-0 dark:bg-gray-900 dark:text-gray-400 bg-white backdrop-blur-md bg-opacity-50 z-10">
      <div className="py-5 px-4 flex items-center justify-between">
        <button
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme == "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>
      </div>
    </div>
  );
};
export default TopMenu;
