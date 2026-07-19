export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bell,
  Briefcase,
  MessageSquare,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Check,
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'job',
    icon: Briefcase,
    title: 'নতুন চাকরির সুযোগ',
    message: 'আপনার প্রোফাইলের সাথে মিলে যায় এমন ৫টি নতুন চাকরি পোস্ট হয়েছে',
    time: '১০ মিনিট আগে',
    read: false,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    type: 'application',
    icon: CheckCircle,
    title: 'আবেদন গৃহীত হয়েছে',
    message: 'টেক সলিউশন্স ওমান-এ আপনার আবেদন গৃহীত হয়েছে',
    time: '২ ঘন্টা আগে',
    read: false,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    type: 'message',
    icon: MessageSquare,
    title: 'নতুন মেসেজ',
    message: 'করিম আহমেদ আপনার পোস্টে মন্তব্য করেছেন',
    time: '৫ ঘন্টা আগে',
    read: true,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 4,
    type: 'favorite',
    icon: Heart,
    title: 'পছন্দের তালিকা আপডেট',
    message: 'আপনার পছন্দের একটি প্রপার্টির দাম কমেছে',
    time: '১ দিন আগে',
    read: true,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    id: 5,
    type: 'alert',
    icon: AlertCircle,
    title: 'গুরুত্বপূর্ণ ঘোষণা',
    message: 'নতুন ভিসা নিয়ম কার্যকর হয়েছে - বিস্তারিত দেখুন',
    time: '২ দিন আগে',
    read: true,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 6,
    type: 'job',
    icon: Briefcase,
    title: 'চাকরির আবেদন পর্যালোচনায়',
    message: 'ওমান কন্সট্রাকশন এলএলসি আপনার CV দেখছে',
    time: '৩ দিন আগে',
    read: true,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 7,
    type: 'message',
    icon: MessageSquare,
    title: 'কমিউনিটি আপডেট',
    message: 'আপনার পোস্টে ৫টি নতুন উত্তর এসেছে',
    time: '৪ দিন আগে',
    read: true,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">নোটিফিকেশন</h1>
              <p className="text-blue-100">
                {unreadCount > 0
                  ? `আপনার ${unreadCount}টি নতুন নোটিফিকেশন আছে`
                  : 'কোন নতুন নোটিফিকেশন নেই'}
              </p>
            </div>
            <Bell className="h-16 w-16 opacity-50" />
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    সব
                  </Button>
                  <Button variant="outline" size="sm">
                    পড়া হয়নি ({unreadCount})
                  </Button>
                  <Button variant="outline" size="sm">
                    চাকরি
                  </Button>
                  <Button variant="outline" size="sm">
                    মেসেজ
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    সব পড়া হিসেবে চিহ্নিত করুন
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    সব মুছে ফেলুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`hover:shadow-lg transition-shadow ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`h-6 w-6 ${notification.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-lg mb-1">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                                  নতুন
                                </span>
                              )}
                            </h3>
                            <p className="text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button size="sm" variant="outline">
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State (when no notifications) */}
          {notifications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">কোন নোটিফিকেশন নেই</h3>
                <p className="text-muted-foreground">
                  আপনার সব নোটিফিকেশন পরিষ্কার করা হয়েছে
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {notifications.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline">পূর্ববর্তী</Button>
              <Button variant="outline">১</Button>
              <Button>২</Button>
              <Button variant="outline">৩</Button>
              <Button variant="outline">পরবর্তী</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
