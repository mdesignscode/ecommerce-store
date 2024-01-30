"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
