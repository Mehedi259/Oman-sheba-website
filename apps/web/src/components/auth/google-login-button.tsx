'use client'

import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { googleLogin } from '@/lib/auth'
import { useAuth } from './auth-provider'
import { useToast } from '@/components/ui/use-toast'

interface GoogleLoginButtonProps {
  onSuccess?: () => void
}

export function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (!credentialResponse.credential) {
            toast({
              title: "লগইন ব্যর্থ হয়েছে",
              description: "Google থেকে টোকেন পাওয়া যায়নি",
              variant: "destructive",
            })
            return
          }
          
          try {
            setIsLoading(true)
            const data = await googleLogin(credentialResponse.credential)
            login(data.user, data.access, data.refresh)
            
            toast({
              title: data.created ? "স্বাগতম!" : "লগইন সফল হয়েছে",
              description: data.created 
                ? "আপনার নতুন অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।" 
                : "আপনি সফলভাবে লগইন করেছেন।",
            })
            
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            toast({
              title: "লগইন ব্যর্থ হয়েছে",
              description: error instanceof Error ? error.message : "অজানা ত্রুটি",
              variant: "destructive",
            })
          } finally {
            setIsLoading(false)
          }
        }}
        onError={() => {
          toast({
            title: "লগইন ব্যর্থ হয়েছে",
            description: "Google লগইন ব্যর্থ হয়েছে",
            variant: "destructive",
          })
        }}
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  )
}
