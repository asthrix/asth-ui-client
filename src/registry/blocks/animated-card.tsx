"use client";

import { motion } from "framer-motion";
import type * as React from "react";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number;
}

export default function AnimatedCard({
  children,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  );
}
