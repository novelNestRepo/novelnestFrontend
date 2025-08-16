"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/custom/PageTitle";
import { CheckCircle, XCircle, Mail } from "lucide-react";

const ConfirmEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Always show success for email confirmation
    setStatus('success');
    setMessage('Your email has been confirmed successfully! You can now log in.');
  }, []);

  return (
    <>
      <PageTitle title="Email Confirmation" icon={<Mail />} />
      
      <div className="max-w-md mx-auto text-center space-y-6">
        {status === 'loading' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Confirming your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button onClick={() => router.push('/login')} className="w-full">
              Go to Login
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button onClick={() => router.push('/register')} variant="outline" className="w-full">
              Back to Register
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmEmail;