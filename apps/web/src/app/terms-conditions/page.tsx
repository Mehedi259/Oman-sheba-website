import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'শর্তাবলী | Hello Oman Sheba',
  description: 'Hello Oman Sheba-এর ব্যবহারের শর্তাবলী।',
}

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">শর্তাবলী (Terms & Conditions)</h1>
      
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">১. সেবার ব্যবহার</h2>
          <p>
            Hello Oman Sheba ওয়েবসাইটটি ব্যবহার করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মত হচ্ছেন। আপনি সম্মতি না দিলে অনুগ্রহ করে আমাদের ওয়েবসাইটটি ব্যবহার করা থেকে বিরত থাকুন।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">২. ব্যবহারকারীর দায়িত্ব</h2>
          <p>
            আপনি সম্মতি দিচ্ছেন যে ওয়েবসাইটের মাধ্যমে বেআইনি, মানহানিকর বা ক্ষতিকর কোনো কনটেন্ট পোস্ট বা শেয়ার করবেন না। যেকোনো ধরনের অপব্যবহারের জন্য অ্যাকাউন্ট স্থগিত করা হতে পারে।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৩. মেধা সম্পদ (Intellectual Property)</h2>
          <p>
            ওয়েবসাইটের সমস্ত ডিজাইন, টেক্সট, গ্রাফিক্স, এবং কোড Hello Oman Sheba-এর মালিকানাধীন। আমাদের পূর্বানুমতি ছাড়া এগুলোর বাণিজ্যিক ব্যবহার সম্পূর্ণ নিষিদ্ধ।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৪. থার্ড পার্টি লিংক</h2>
          <p>
            ওয়েবসাইটে থাকা বিভিন্ন লিংক বা বিজ্ঞাপন অন্যান্য ওয়েবসাইটে নিয়ে যেতে পারে। সেই ওয়েবসাইটগুলোর কনটেন্ট বা শর্তাবলীর জন্য আমরা দায়ী নই।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৫. শর্তাবলী সংশোধন</h2>
          <p>
            আমরা যেকোনো সময় এই শর্তাবলী আপডেট করার অধিকার রাখি। সংশোধিত শর্তাবলী ওয়েবসাইটে প্রকাশিত হওয়ার পর থেকেই কার্যকর বলে গণ্য হবে।
          </p>
        </section>
      </div>
    </div>
  )
}
