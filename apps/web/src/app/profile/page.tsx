'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  FileText,
  Settings,
  Bell,
  Shield,
  Edit,
  Save,
  Trash2,
  Lock,
  Check,
  Globe,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { AuthModal } from '@/components/auth/auth-modal';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  getUserPosts,
  deleteUserPost,
  getUserApplications,
  getFavorites,
  removeFavorite,
  getNotifications,
  markNotificationRead
} from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

export default function ProfilePage() {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'favorites' | 'applications' | 'notifications'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Profile Form Data
  const [profileData, setProfileData] = useState({
    name: '',
    name_bn: '',
    email: '',
    phone: '',
    city: '',
    area: '',
    date_of_birth: '',
    language: 'bn',
    created_at: ''
  });

  // Data lists
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Security Form
  const [passwordForm, setPasswordForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, postsRes, favsRes, appsRes, notifsRes] = await Promise.allSettled([
        getUserProfile(),
        getUserPosts(),
        getFavorites(),
        getUserApplications(),
        getNotifications()
      ]);

      if (profileRes.status === 'fulfilled' && profileRes.value) {
        const p = profileRes.value;
        setProfileData({
          name: p.name || p.first_name || p.username || '',
          name_bn: p.name_bn || '',
          email: p.email || '',
          phone: p.phone || '',
          city: p.city || '',
          area: p.area || '',
          date_of_birth: p.date_of_birth || '',
          language: p.language || 'bn',
          created_at: p.created_at || ''
        });
      }

      if (postsRes.status === 'fulfilled' && Array.isArray(postsRes.value)) {
        setMyPosts(postsRes.value);
      }

      if (favsRes.status === 'fulfilled') {
        const favData = favsRes.value;
        setFavorites(Array.isArray(favData) ? favData : favData?.results || []);
      }

      if (appsRes.status === 'fulfilled' && Array.isArray(appsRes.value)) {
        setApplications(appsRes.value);
      }

      if (notifsRes.status === 'fulfilled') {
        const notifData = notifsRes.value;
        setNotifications(Array.isArray(notifData) ? notifData : notifData?.results || []);
      }
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 text-center">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">লগইন প্রয়োজন</h2>
        <p className="text-muted-foreground mb-6 max-w-md">আপনার প্রোফাইল দেখতে এবং তথ্য পরিবর্তন করতে প্রথমে অ্যাকাউন্টে লগইন করুন।</p>
        <Button onClick={() => setAuthModalOpen(true)}>লগইন করুন</Button>
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => {
            setAuthModalOpen(false);
            if (!isAuthenticated) router.push('/');
          }} 
        />
      </div>
    );
  }

  // Helper for Initials
  const getInitials = (name?: string | null) => {
    if (!name) return 'US';
    const parts = name.trim().split(' ');
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({
        name: profileData.name,
        name_bn: profileData.name_bn,
        phone: profileData.phone,
        city: profileData.city,
        area: profileData.area,
        date_of_birth: profileData.date_of_birth || null,
        language: profileData.language
      });
      toast({
        title: 'সফল!',
        description: 'আপনার প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে।',
      });
    } catch (err: any) {
      toast({
        title: 'ত্রুটি',
        description: err.message || 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে।',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: 'ত্রুটি',
        description: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।',
        variant: 'destructive'
      });
      return;
    }
    setSaving(true);
    try {
      await changeUserPassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password
      });
      toast({
        title: 'সফল!',
        description: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।',
      });
      setPasswordForm({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      toast({
        title: 'ত্রুটি',
        description: err.message || 'পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে।',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postType: string, id: number) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান?')) return;
    try {
      await deleteUserPost(postType, id);
      setMyPosts(prev => prev.filter(item => !(item.id === id && item.post_type === postType)));
      toast({ title: 'পোস্টটি মুছে ফেলা হয়েছে' });
    } catch (err: any) {
      toast({ title: 'ত্রুটি', description: 'পোস্ট মোছা সম্ভব হয়নি', variant: 'destructive' });
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavorite(id);
      setFavorites(prev => prev.filter(item => item.id !== id));
      toast({ title: 'পছন্দের তালিকা থেকে মুছে ফেলা হয়েছে' });
    } catch (err) {
      toast({ title: 'ত্রুটি', description: 'ব্যর্থ হয়েছে', variant: 'destructive' });
    }
  };

  const handleMarkNotif = async (id: number) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-purple-600 text-3xl font-bold shadow-md shrink-0">
              {getInitials(profileData.name || authUser?.name || authUser?.email)}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profileData.name_bn || profileData.name || authUser?.name || 'ব্যবহারকারী'}</h1>
              <p className="text-purple-100 mt-1">{profileData.email || authUser?.email || ''}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-sm text-purple-100">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profileData.city ? `${profileData.city}${profileData.area ? `, ${profileData.area}` : ''}` : 'ওমান'}
                </span>
                {profileData.created_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    সদস্য হয়েছেন: {new Date(profileData.created_at).toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1">
            <Card className="overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
                      activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>প্রোফাইল তথ্য</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
                      activeTab === 'posts' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    <span>আমার পোস্ট ({myPosts.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
                      activeTab === 'favorites' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>পছন্দের তালিকা ({favorites.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
                      activeTab === 'applications' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>চাকরির আবেদন ({applications.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors ${
                      activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span>নোটিফিকেশন ({notifications.filter(n => !n.read).length})</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">মোট পোস্ট</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{myPosts.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">সক্রিয় পোস্ট: {myPosts.filter(p => p.status === 'PUBLISHED').length}</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">পছন্দের তালিকা</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{favorites.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">সংরক্ষিত আইটেম</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">চাকরির আবেদন</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{applications.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">পেন্ডিং: {applications.filter(a => a.status === 'PENDING').length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Tab 1: Profile Info */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    ব্যক্তিগত তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">পূর্ণ নাম *</label>
                        <Input 
                          value={profileData.name} 
                          onChange={e => setProfileData({ ...profileData, name: e.target.value })} 
                          placeholder="আপনার নাম"
                          required 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
                        <Input value={profileData.email} disabled className="bg-muted text-muted-foreground" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">ফোন নম্বর</label>
                        <Input 
                          value={profileData.phone} 
                          onChange={e => setProfileData({ ...profileData, phone: e.target.value })} 
                          placeholder="+968 9XXXXXXX" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">জন্ম তারিখ</label>
                        <Input 
                          type="date" 
                          value={profileData.date_of_birth} 
                          onChange={e => setProfileData({ ...profileData, date_of_birth: e.target.value })} 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">শহর</label>
                        <Input 
                          value={profileData.city} 
                          onChange={e => setProfileData({ ...profileData, city: e.target.value })} 
                          placeholder="Muscat" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">এলাকা</label>
                        <Input 
                          value={profileData.area} 
                          onChange={e => setProfileData({ ...profileData, area: e.target.value })} 
                          placeholder="Al Khuwair" 
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={saving} className="gap-2 mt-4">
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Tab 2: My Posts */}
            {activeTab === 'posts' && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    আমার পোস্টসমূহ
                  </CardTitle>
                  <Link href="/post/create">
                    <Button size="sm">+ নতুন পোস্ট তৈরি করুন</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myPosts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                      <p className="font-semibold">আপনি এখনো কোনো পোস্ট করেননি</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myPosts.map((post: any) => (
                        <div key={`${post.post_type}-${post.id}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary capitalize">
                                {post.post_type}
                              </span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {post.status === 'PUBLISHED' ? 'পাবলিশড' : post.status}
                              </span>
                            </div>
                            <h4 className="font-bold text-base">{post.title_bn || post.title}</h4>
                            <p className="text-xs text-muted-foreground">{post.city} • {formatRelativeTime(post.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Link href={`/${post.post_type === 'job' ? 'jobs' : post.post_type === 'property' ? 'properties' : post.post_type === 'vehicle' ? 'vehicles' : 'services'}/${post.id}`}>
                              <Button variant="outline" size="sm">দেখুন</Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.post_type, post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab 3: Favorites */}
            {activeTab === 'favorites' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    পছন্দের তালিকা
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-3 opacity-40 text-red-400" />
                      <p className="font-semibold">পছন্দের তালিকায় কোনো আইটেম নেই</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {favorites.map((fav: any) => (
                        <div key={fav.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div>
                            <p className="font-semibold capitalize">{fav.favorite_type || fav.content_type} #{fav.favorite_id || fav.content_id}</p>
                            <p className="text-xs text-muted-foreground">সংরক্ষণ সময়: {formatRelativeTime(fav.created_at)}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveFavorite(fav.id)} className="text-red-500 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-1" /> মুছুন
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab 4: Applications */}
            {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    চাকরির আবেদনসমূহ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-40" />
                      <p className="font-semibold">আপনি কোনো কোম্পানিতে চাকরির আবেদন করেননি</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app: any) => (
                        <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div>
                            <h4 className="font-bold">{app.job_title}</h4>
                            <p className="text-sm text-muted-foreground">{app.company_name}</p>
                            <p className="text-xs text-muted-foreground mt-1">আবেদনের তারিখ: {formatRelativeTime(app.created_at)}</p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 uppercase">
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab 5: Notifications */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    নোটিফিকেশন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notifications.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-3 opacity-40" />
                      <p className="font-semibold">কোনো নোটিফিকেশন নেই</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notif: any) => (
                        <div 
                          key={notif.id} 
                          onClick={() => !notif.read && handleMarkNotif(notif.id)}
                          className={`p-4 rounded-lg border transition-colors cursor-pointer flex items-start justify-between ${
                            notif.read ? 'bg-card opacity-70' : 'bg-blue-50/50 border-blue-200'
                          }`}
                        >
                          <div>
                            <h4 className="font-bold text-sm">{notif.title}</h4>
                            <p className="text-sm text-muted-foreground">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(notif.created_at)}</p>
                          </div>
                          {!notif.read && <span className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0"></span>}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activity Feed Section */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>সাম্প্রতিক কার্যকলাপ</CardTitle>
                </CardHeader>
                <CardContent>
                  {myPosts.length === 0 && favorites.length === 0 && applications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">কোনো সাম্প্রতিক কার্যকলাপ পাওয়া যায়নি</p>
                  ) : (
                    <div className="space-y-4">
                      {myPosts.slice(0, 3).map((p: any) => (
                        <div key={`post-${p.id}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">নতুন পোস্ট প্রকাশ করেছেন</p>
                            <p className="text-sm text-muted-foreground">{p.title_bn || p.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(p.created_at)}</p>
                          </div>
                        </div>
                      ))}
                      {applications.slice(0, 2).map((app: any) => (
                        <div key={`app-${app.id}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">চাকরিতে আবেদন করেছেন</p>
                            <p className="text-sm text-muted-foreground">{app.job_title} ({app.company_name})</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(app.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
