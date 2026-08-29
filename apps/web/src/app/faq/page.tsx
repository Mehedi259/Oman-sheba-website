import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'সাধারণ জিজ্ঞাসা | Hello Oman Sheba',
  description: 'Hello Oman Sheba সম্পর্কে সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)।',
}

export default function FaqPage() {
  const faqs = [
    {
      question: "অ্যাকাউন্ট কীভাবে খুলবো?",
      answer: "হেডার থেকে 'লগইন' অপশনে ক্লিক করে আপনি আপনার গুগল অ্যাকাউন্ট ব্যবহার করে সহজেই অ্যাকাউন্ট খুলতে পারবেন।"
    },
    {
      question: "আমি কি পাসওয়ার্ড পরিবর্তন করতে পারবো?",
      answer: "হ্যাঁ, আপনার প্রোফাইল সেকশনের 'পাসওয়ার্ড' ট্যাবে গিয়ে আপনার পুরানো এবং নতুন পাসওয়ার্ড দিয়ে তা পরিবর্তন করতে পারবেন।"
    },
    {
      question: "পছন্দের তালিকা (Favorites) কিভাবে কাজ করে?",
      answer: "যে কোনো চাকরি বা মার্কেট আইটেম দেখার সময় হার্ট (♡) আইকনে ক্লিক করলে তা আপনার পছন্দের তালিকায় যুক্ত হবে। পরে আপনার ড্যাশবোর্ড বা প্রোফাইল থেকে সেগুলো সহজেই দেখতে পারবেন।"
    },
    {
      question: "আমি কিভাবে আমার পোস্ট মুছে ফেলবো?",
      answer: "প্রোফাইলের 'আমার পোস্ট' সেকশনে যান। সেখানে আপনার করা সমস্ত পোস্ট দেখতে পাবেন এবং ডিলিট আইকনে ক্লিক করে সেগুলো মুছে ফেলতে পারবেন।"
    },
    {
      question: "মার্কেটপ্লেসে কিছু বিক্রি করতে চাই, কী করতে হবে?",
      answer: "আপনি বিজ্ঞাপন দেওয়ার অপশন থেকে নতুন পণ্য বিক্রির বিজ্ঞাপন বা চাকরির পোস্ট দিতে পারবেন। প্রয়োজনীয় তথ্য ও ছবি দিয়ে সাবমিট করলেই পোস্টটি লাইভ হয়ে যাবে।"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">সাধারণ জিজ্ঞাসা (FAQ)</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-muted/30 p-6 rounded-lg border">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg">
              <span>{faq.question}</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-muted-foreground mt-4 leading-relaxed group-open:animate-fadeIn">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  )
}
