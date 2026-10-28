"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";

/**
 * Re-mounts on every navigation, giving each route a smooth enter transition.
 * Opacity only — a transform here would break `position: fixed` descendants (navbar, modals).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </motion.div>
  );
}
