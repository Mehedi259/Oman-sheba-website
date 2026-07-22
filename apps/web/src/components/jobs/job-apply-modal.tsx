'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { applyForJob } from '@/lib/api';
import { Loader2, Send, CheckCircle2, Briefcase, X } from 'lucide-react';

interface JobApplyModalProps {
  jobId: number;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function JobApplyModal({ jobId, jobTitle, isOpen, onClose, onSuccess }: JobApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await applyForJob(jobId, coverLetter);
      toast({
        title: 'আবেদন সফল হয়েছে!',
        description: 'আপনার চাকরির আবেদন সফলভাবে কর্তৃপক্ষের কাছে পাঠানো হয়েছে।',
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      toast({
        title: 'ত্রুটি',
        description: err.message || 'আবেদন জমা দিতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">চাকরির আবেদন করুন</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{jobTitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              কভার লেটার বা বার্তা (ঐচ্ছিক)
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="আপনার অভিজ্ঞতা, যোগাযোগের সময় বা বিশেষ কোনো তথ্য সংক্ষেপে লিখুন..."
              rows={4}
              className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              বাতিল
            </Button>
            <Button type="submit" disabled={submitting} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? 'পাঠানো হচ্ছে...' : 'আবেদন জমা দিন'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
