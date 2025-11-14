"use client";

import { motion } from "framer-motion";
import type * as React from "react";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {}

export default function AnimatedButton({
  children,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
