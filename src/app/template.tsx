"use client";

import { usePathname } from "next/navigation";
import PageTransition from "@/components/motion/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Disable transition for admin routes to avoid excessive motion/state reset in dashboard
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return <PageTransition>{children}</PageTransition>;
}
