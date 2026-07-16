'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Menu, User, Bell, Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '../auth/auth-provider'
import { AuthModal } from '../auth/auth-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!mobileMenuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)
  const toggleMenu = () => {
    setEverOpened(true)
    setMobileMenuOpen((open) => !open)
  }

  const handlePostClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setAuthModalOpen(true)
    }
  }

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Hello Oman</span>
            <span className="ml-2 text-2xl font-bold">Sheba</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
            চাকরি
          </Link>
          <Link href="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            বাসা ভাড়া
          </Link>
          <Link href="/vehicles" className="text-sm font-medium hover:text-primary transition-colors">
            গাড়ি
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
            সেবা
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
            কমিউনিটি
          </Link>
          <Link href="/classifieds" className="text-sm font-medium hover:text-primary transition-colors">
            মার্কেট
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex relative" asChild>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Link>
          </Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar_url || ''} alt={user?.name || ''} />
                    <AvatarFallback>{user?.name?.charAt(0) || <User className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">প্রোফাইল</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="hidden md:flex" onClick={() => setAuthModalOpen(true)}>
              লগইন
            </Button>
          )}
          
          <Button className="hidden md:flex" asChild>
            <Link href="/post/create" onClick={handlePostClick}>পোস্ট করুন</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden grid transition-[grid-template-rows] duration-[400ms] ease-in-out',
          mobileMenuOpen ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
          !mobileMenuOpen && 'pointer-events-none'
        )}
      >
        <div className="overflow-hidden">
          <nav
            className={cn(
              'container py-4 flex flex-col space-y-3 origin-top-right',
              !everOpened && 'opacity-0',
              everOpened && (mobileMenuOpen ? 'animate-genie-open' : 'animate-genie-close')
            )}
          >
            <Link href="/jobs" onClick={closeMenu} className="text-sm font-medium hover:text-primary">চাকরি</Link>
            <Link href="/properties" onClick={closeMenu} className="text-sm font-medium hover:text-primary">বাসা ভাড়া</Link>
            <Link href="/vehicles" onClick={closeMenu} className="text-sm font-medium hover:text-primary">গাড়ি</Link>
            <Link href="/services" onClick={closeMenu} className="text-sm font-medium hover:text-primary">সেবা</Link>
            <Link href="/community" onClick={closeMenu} className="text-sm font-medium hover:text-primary">কমিউনিটি</Link>
            <Link href="/classifieds" onClick={closeMenu} className="text-sm font-medium hover:text-primary">মার্কেট</Link>
            <div className="border-t pt-3 space-y-2">
              <Link href="/search" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                <Search className="h-4 w-4" /> সার্চ
              </Link>
              <Link href="/favorites" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                <Heart className="h-4 w-4" /> পছন্দের তালিকা
              </Link>
              <Link href="/notifications" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                <Bell className="h-4 w-4" /> নোটিফিকেশন
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                    <User className="h-4 w-4" /> প্রোফাইল ({user?.name})
                  </Link>
                  <button onClick={() => { logout(); closeMenu(); }} className="flex items-center gap-2 text-sm font-medium hover:text-primary w-full text-left">
                    লগআউট
                  </button>
                </>
              ) : (
                <button onClick={() => { setAuthModalOpen(true); closeMenu(); }} className="flex items-center gap-2 text-sm font-medium hover:text-primary w-full text-left">
                  <User className="h-4 w-4" /> লগইন
                </button>
              )}
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/post/create" onClick={(e) => { handlePostClick(e); closeMenu(); }}>পোস্ট করুন</Link>
            </Button>
          </nav>
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  )
}
