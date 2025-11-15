"use client";

import { motion } from "framer-motion";
import { Box, ChevronDown, Menu, Search } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface Header04Props {
  logo?: React.ReactNode;
  menuItems?: MenuItem[];
  signInText?: string;
  ctaText?: string;
  onSignIn?: () => void;
  onCta?: () => void;
  onSearch?: () => void;
}

const defaultMenuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
];

const DefaultLogo = () => (
  <div className="flex items-center gap-2">
    <Box className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
    <span className="text-lg font-semibold text-muted-foreground">brix</span>
  </div>
);

export default function Header04({
  logo,
  menuItems = defaultMenuItems,
  signInText = "Sign In",
  ctaText = "Get Started",
  onSignIn,
  onCta,
  onSearch,
}: Header04Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/30"
    >
      <div className="container flex h-[88px] items-center justify-between px-4 md:px-8 lg:px-[167px]">
        {/* Logo */}
        <div className="flex items-center">{logo || <DefaultLogo />}</div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {menuItems.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 text-base font-normal text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
              )}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={onSearch}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="h-auto rounded-md border-border bg-background px-[18px] py-[15px] text-sm font-semibold text-muted-foreground shadow-none hover:bg-accent hover:text-foreground"
            onClick={onSignIn}
          >
            {signInText}
          </Button>
          <Button
            className="h-auto rounded-md bg-muted-foreground px-[18px] py-3.5 text-sm font-semibold text-background shadow-sm hover:bg-muted-foreground/90"
            onClick={onCta}
          >
            {ctaText}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 pt-6">
              {menuItems.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-base font-normal text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  )}
                </a>
              ))}

              {/* Mobile Action Buttons */}
              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm font-semibold"
                  onClick={() => {
                    onSearch?.();
                    setIsOpen(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center text-sm font-semibold"
                  onClick={() => {
                    onSignIn?.();
                    setIsOpen(false);
                  }}
                >
                  {signInText}
                </Button>
                <Button
                  className="w-full justify-center bg-muted-foreground text-sm font-semibold text-background hover:bg-muted-foreground/90"
                  onClick={() => {
                    onCta?.();
                    setIsOpen(false);
                  }}
                >
                  {ctaText}
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
