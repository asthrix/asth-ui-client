'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Menu, Search, ChevronDown, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

interface Header02Props {
  logo?: React.ReactNode
  menuItems?: MenuItem[]
  searchPlaceholder?: string
  onSearch?: (query: string) => void
}

const defaultMenuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Features',
    href: '/features',
    children: [
      { label: 'Feature 1', href: '/features/1' },
      { label: 'Feature 2', href: '/features/2' },
      { label: 'Feature 3', href: '/features/3' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

const DefaultLogo = () => (
  <div className="flex items-center gap-2">
    {/* <div className="flex h-7 w-7 items-center justify-center rounded bg-muted-foreground">
      <div className="grid grid-cols-2 gap-0.5">
        <div className="h-1.5 w-1.5 rounded-sm bg-background" />
        <div className="h-1.5 w-1.5 rounded-sm bg-background" />
        <div className="h-1.5 w-1.5 rounded-sm bg-background" />
        <div className="h-1.5 w-1.5 rounded-sm bg-background" />
      </div>
    </div> */}
    <Box className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
    <span className="text-lg font-semibold text-muted-foreground">brix</span>
  </div>
)

export default function Header02({
  logo,
  menuItems = defaultMenuItems,
  searchPlaceholder = 'Search for...',
  onSearch,
}: Header02Props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b bg-muted/50 backdrop-blur supports-backdrop-filter:bg-muted/30"
    >
      <div className="container flex h-[92px] items-center justify-between px-4 md:px-8 lg:px-[167px]">
        {/* Logo */}
        <div className="flex items-center">
          {logo || <DefaultLogo />}
        </div>

        {/* Desktop Navigation & Search */}
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

          {/* Desktop Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-auto w-[286px] rounded-lg border-muted bg-background pl-10 pr-4 py-4 text-sm text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-1"
            />
          </form>
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
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 text-sm"
                />
              </form>

              {/* Mobile Menu Items */}
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
