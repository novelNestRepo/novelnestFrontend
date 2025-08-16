"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/custom/PageTitle";
import { Mail } from "lucide-react";

const CheckEmail = () => {
  const router = useRouter();

  return (
    <>
      <PageTitle title="Check Your Email" icon={<Mail />} />
      
      <div className="max-w-md mx-auto text-center space-y-6">
        <Mail className="h-16 w-16 text-blue-500 mx-auto" />
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate your account.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => router.push('/login')} className="w-full">
            Go to Login
          </Button>
          <Button onClick={() => router.push('/register')} variant="outline" className="w-full">
            Back to Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckEmail;