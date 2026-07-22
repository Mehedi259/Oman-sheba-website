'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-provider';
import { AuthModal } from '@/components/auth/auth-modal';
import { JobApplyModal } from './job-apply-modal';
import { checkJobApplied } from '@/lib/api';
import { CheckCircle2, Send } from 'lucide-react';
import { FavoriteButton } from '@/components/ui/favorite-button';

interface JobApplySectionProps {
  jobId: number;
  jobTitle: string;
}

export function JobApplySection({ jobId, jobTitle }: JobApplySectionProps) {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setChecking(true);
      checkJobApplied(jobId)
        .then((res) => {
          if (res && res.applied) {
            setHasApplied(true);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setChecking(false));
    }
  }, [isAuthenticated, jobId]);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      setApplyModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-2 mt-2">
        {hasApplied ? (
          <Button disabled className="flex-1 bg-green-600 text-white gap-2 opacity-100 cursor-default">
            <CheckCircle2 className="h-4 w-4" />
            আবেদন করা হয়েছে
          </Button>
        ) : (
          <Button
            onClick={handleApplyClick}
            disabled={checking}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium"
          >
            <Send className="h-4 w-4" />
            এখনই আবেদন করুন
          </Button>
        )}
        <FavoriteButton type="job" id={jobId} />
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <JobApplyModal
        jobId={jobId}
        jobTitle={jobTitle}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSuccess={() => setHasApplied(true)}
      />
    </>
  );
}
