'use client';

export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { getNotifications, markNotificationRead } from '@/lib/api';
import { useAuth } from '@/components/auth/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      toast({ title: 'ত্রুটি', description: 'আপডেট করতে সমস্যা হয়েছে।', variant: 'destructive' });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length === 0) return;
      await Promise.all(unreadIds.map(id => markNotificationRead(id)));
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast({ title: 'সফল', description: 'সব নোটিফিকেশন পড়া হিসেবে মার্ক করা হয়েছে।' });
    } catch (err) {
      toast({ title: 'ত্রুটি', description: 'আপডেট করতে সমস্যা হয়েছে।', variant: 'destructive' });
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'job') return n.type === 'JOB_APPLICATION' || n.type === 'JOB_ALERT';
    if (filter === 'message') return n.type === 'MESSAGE';
    if (filter === 'system') return n.type === 'SYSTEM' || n.type === 'ANNOUNCEMENT';
    return true;
  });

  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'JOB_APPLICATION':
      case 'JOB_ALERT':
        return { icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'MESSAGE':
        return { icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'REVIEW':
        return { icon: Heart, color: 'text-red-600', bgColor: 'bg-red-100' };
      case 'SYSTEM':
      case 'ANNOUNCEMENT':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 'BOOKING':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' };
      default:
        return { icon: Bell, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

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
          {!isAuthenticated ? (
            <Card className="py-16">
              <CardContent className="text-center">
                <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">লগইন প্রয়োজন</h3>
                <p className="text-muted-foreground mb-4">
                  নোটিফিকেশন দেখতে অনুগ্রহ করে লগইন করুন।
                </p>
                <Button asChild>
                  <Link href="/auth/login">লগইন করুন</Link>
                </Button>
              </CardContent>
            </Card>
          ) : loading ? (
            <div className="text-center py-16 text-muted-foreground">লোড হচ্ছে...</div>
          ) : (
            <>
              {/* Action Buttons */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
                        সব
                      </Button>
                      <Button variant={filter === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('unread')}>
                        পড়া হয়নি ({unreadCount})
                      </Button>
                      <Button variant={filter === 'job' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('job')}>
                        চাকরি
                      </Button>
                      <Button variant={filter === 'message' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('message')}>
                        মেসেজ
                      </Button>
                      <Button variant={filter === 'system' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('system')}>
                        সিস্টেম
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                        <Check className="h-4 w-4 mr-2" />
                        সব পড়া হয়েছে
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications List */}
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => {
                    const { icon: Icon, color, bgColor } = getIconAndColor(notification.type);
                    
                    return (
                      <Card
                        key={notification.id}
                        className={`transition-colors hover:bg-muted/50 ${
                          !notification.read ? 'border-primary/50 bg-primary/5' : ''
                        }`}
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`shrink-0 h-12 w-12 rounded-full ${bgColor} flex items-center justify-center`}
                            >
                              <Icon className={`h-6 w-6 ${color}`} />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3
                                  className={`font-semibold text-lg ${
                                    !notification.read ? 'text-foreground' : 'text-muted-foreground'
                                  }`}
                                >
                                  {notification.title_bn || notification.title}
                                </h3>
                                <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {new Date(notification.created_at).toLocaleDateString()}
                                </div>
                              </div>
                              <p
                                className={`text-sm ${
                                  !notification.read ? 'text-foreground/80' : 'text-muted-foreground'
                                }`}
                              >
                                {notification.message_bn || notification.message}
                              </p>
                              {!notification.read && (
                                <div className="pt-2 flex gap-2">
                                  <Button variant="link" size="sm" className="h-auto p-0 text-primary" onClick={() => handleMarkAsRead(notification.id)}>
                                    পড়া হয়েছে হিসেবে চিহ্নিত করুন
                                  </Button>
                                  {notification.link && (
                                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                                      <Link href={notification.link}>বিস্তারিত দেখুন</Link>
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Card className="py-16">
                    <CardContent className="text-center">
                      <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <h3 className="text-xl font-bold mb-2">কোন নোটিফিকেশন নেই</h3>
                      <p className="text-muted-foreground">
                        বর্তমানে দেখানোর মতো কোন নোটিফিকেশন নেই
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
