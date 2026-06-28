'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Menu, User, Bell, Heart } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            ক্লাসিফাইড
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden md:flex">
            পোস্ট করুন
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col space-y-3">
            <Link href="/jobs" className="text-sm font-medium hover:text-primary">চাকরি</Link>
            <Link href="/properties" className="text-sm font-medium hover:text-primary">বাসা ভাড়া</Link>
            <Link href="/vehicles" className="text-sm font-medium hover:text-primary">গাড়ি</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">সেবা</Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary">কমিউনিটি</Link>
            <Link href="/classifieds" className="text-sm font-medium hover:text-primary">ক্লাসিফাইড</Link>
            <Button className="w-full mt-4">পোস্ট করুন</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
