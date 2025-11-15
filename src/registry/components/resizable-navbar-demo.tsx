"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/registry/ui/resizable-navbar";

export default function ResizableNavbarDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#" },
    { name: "Services", link: "#" },
    { name: "Contact", link: "#" },
  ];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Hero content to show scroll behavior */}
      <div className="h-[200vh] bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex gap-2">
              <NavbarButton variant="secondary">Login</NavbarButton>
              <NavbarButton variant="primary">Sign Up</NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <NavItems
                items={navItems}
                onItemClick={() => setIsOpen(false)}
                className="flex-col items-start gap-4"
              />
              <div className="flex flex-col gap-2 w-full">
                <NavbarButton variant="secondary" className="w-full">
                  Login
                </NavbarButton>
                <NavbarButton variant="primary" className="w-full">
                  Sign Up
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Demo content */}
        <div className="container mx-auto px-4 pt-40">
          <h1 className="text-4xl font-bold text-center mb-4">
            Scroll to see the navbar resize
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            The navbar will shrink and apply a blur effect as you scroll down
          </p>
        </div>
      </div>
    </div>
  );
}
