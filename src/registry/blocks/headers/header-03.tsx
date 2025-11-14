"use client";

import { motion } from "framer-motion";
import { Box, Menu } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuItem {
  label: string;
  href: string;
}

interface Header03Props {
  logo?: React.ReactNode;
  leftMenuItems?: MenuItem[];
  rightMenuItems?: MenuItem[];
}

const defaultLeftMenuItems: MenuItem[] = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
];

const defaultRightMenuItems: MenuItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const DefaultLogo = () => (
  <div className="flex items-center gap-2">
    <Box className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
    <span className="text-lg font-semibold text-muted-foreground">brix</span>
  </div>
);

export default function Header03({
  logo,
  leftMenuItems = defaultLeftMenuItems,
  rightMenuItems = defaultRightMenuItems,
}: Header03Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const allLinks = [...leftMenuItems, ...rightMenuItems];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/30"
    >
      <div className="container flex h-[88px] items-center justify-between px-4 md:px-8 lg:px-[167px]">
        {/* Desktop Navigation - Left */}
        <nav className="hidden items-center gap-6 md:flex">
          {leftMenuItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-normal text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
          {logo || <DefaultLogo />}
        </div>

        {/* Desktop Navigation - Right */}
        <nav className="hidden items-center gap-6 md:flex">
          {rightMenuItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-normal text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 pt-6">
              {allLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-base font-normal text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
