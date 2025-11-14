"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, ChevronDown, Menu } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

interface Header01Props {
  logo?: React.ReactNode;
  menuItems?: MenuItem[];
  loginText?: string;
  ctaText?: string;
  onLogin?: () => void;
  onCta?: () => void;
}

const defaultMenuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Features",
    href: "/features",
    children: [
      { label: "Feature 1", href: "/features/1" },
      { label: "Feature 2", href: "/features/2" },
      { label: "Feature 3", href: "/features/3" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

const DefaultLogo = () => (
  <div className="flex items-center gap-2">
    <Box className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
    <span className="text-lg font-semibold text-muted-foreground">brix</span>
  </div>
);

export default function Header01({
  logo,
  menuItems = defaultMenuItems,
  loginText = "Login",
  ctaText = "Get in touch",
  onLogin,
  onCta,
}: Header01Props) {
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
        <div className="hidden items-center gap-8 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 text-base font-normal text-muted-foreground hover:bg-transparent hover:text-foreground">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.href}
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {child.label}
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className="inline-flex h-auto items-center gap-1.5 rounded-md bg-transparent px-3 py-2 text-base font-normal text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-auto rounded-md border-border bg-background px-[18px] py-[15px] text-sm font-semibold text-muted-foreground shadow-none hover:bg-accent hover:text-foreground"
              onClick={onLogin}
            >
              {loginText}
            </Button>
            <Button
              className="h-auto gap-1 rounded-md bg-muted-foreground px-[18px] py-3.5 text-sm font-semibold text-background shadow-sm hover:bg-muted-foreground/90"
              onClick={onCta}
            >
              {ctaText}
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
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
              {menuItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <a
                    href={item.href}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-base font-normal text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    onClick={() => !item.children && setIsOpen(false)}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    )}
                  </a>
                  {item.children && (
                    <div className="ml-4 flex flex-col gap-1 border-l pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Action Buttons */}
              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                <Button
                  variant="outline"
                  className="w-full justify-center text-sm font-semibold"
                  onClick={() => {
                    onLogin?.();
                    setIsOpen(false);
                  }}
                >
                  {loginText}
                </Button>
                <Button
                  className="w-full justify-center gap-1 bg-muted-foreground text-sm font-semibold text-background hover:bg-muted-foreground/90"
                  onClick={() => {
                    onCta?.();
                    setIsOpen(false);
                  }}
                >
                  {ctaText}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
