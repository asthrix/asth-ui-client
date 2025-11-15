"use client";
import { HoverBorderGradient } from "@/registry/ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";

export default function HoverBorderGradientDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center gap-4 flex-wrap p-8">
      <HoverBorderGradient
        containerClassName="rounded-full"
        className="bg-black text-white dark:bg-white dark:text-black font-semibold"
      >
        <span className="px-6 py-3">Hover me</span>
      </HoverBorderGradient>

      <HoverBorderGradient
        containerClassName="rounded-lg"
        duration={2}
        clockwise={false}
        className="bg-white dark:bg-black text-black dark:text-white"
      >
        <span className="px-4 py-2 flex items-center gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </span>
      </HoverBorderGradient>

      <HoverBorderGradient
        as="button"
        containerClassName="rounded-full"
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
      >
        <span className="px-8 py-4">Custom Colors</span>
      </HoverBorderGradient>
    </div>
  );
}
