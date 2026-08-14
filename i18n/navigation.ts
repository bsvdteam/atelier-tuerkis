import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-bewusste Ersätze für next/link & next/navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
