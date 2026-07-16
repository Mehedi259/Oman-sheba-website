'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GoogleLoginButton } from './google-login-button'
import { ShieldAlert } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  title = "লগইন প্রয়োজন", 
  description = "এই কাজটি করার জন্য আপনাকে লগইন করতে হবে। Google দিয়ে সহজেই লগইন করুন।" 
}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center sm:text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 mb-4">
            <ShieldAlert className="h-6 w-6 text-violet-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4 mt-2">
          <GoogleLoginButton onSuccess={onClose} />
          <p className="text-xs text-center text-muted-foreground mt-4">
            লগইন করার মাধ্যমে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতির সাথে সম্মত হচ্ছেন।
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
