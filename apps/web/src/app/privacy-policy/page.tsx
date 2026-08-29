import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি | Hello Oman Sheba',
  description: 'Hello Oman Sheba-এর গোপনীয়তা নীতি।',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">গোপনীয়তা নীতি (Privacy Policy)</h1>
      
      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">১. তথ্য সংগ্রহ</h2>
          <p>
            আমরা আপনার অ্যাকাউন্ট খোলার সময় আপনার নাম, ইমেইল এবং ফোন নম্বর সংগ্রহ করি। আপনার পছন্দ ও ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ এবং অন্যান্য তথ্য ব্যবহার করা হতে পারে।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">২. তথ্যের ব্যবহার</h2>
          <p>
            আপনার তথ্য শুধুমাত্র আমাদের সেবা প্রদান, সহায়তা প্রদান এবং সিস্টেমের উন্নয়নের জন্য ব্যবহৃত হবে। আমরা আপনার তথ্য তৃতীয় কোনো পক্ষের সাথে শেয়ার করি না, যদি না তা আইনি কারণে প্রয়োজন হয়।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৩. তথ্য নিরাপত্তা</h2>
          <p>
            আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে আমরা বিভিন্ন নিরাপত্তা ব্যবস্থা গ্রহণ করেছি। তবে ইন্টারনেটের মাধ্যমে ডেটা আদান-প্রদান ১০০% নিরাপদ নয়, তাই আমরা পুরোপুরি গ্যারান্টি দিতে পারি না।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৪. নীতিমালা পরিবর্তন</h2>
          <p>
            Hello Oman Sheba যেকোনো সময় এই নীতিমালার পরিবর্তন বা সংশোধন করার অধিকার সংরক্ষণ করে। যেকোনো পরিবর্তনের পর আপডেট এই পেজে প্রকাশ করা হবে।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">৫. যোগাযোগ</h2>
          <p>
            আপনার যদি এই গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন থাকে, তবে অনুগ্রহ করে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
          </p>
        </section>
      </div>
    </div>
  )
}
