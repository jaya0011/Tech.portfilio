"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";

/** Re-mounts on every navigation, giving each route a smooth enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </motion.div>
  );
}
