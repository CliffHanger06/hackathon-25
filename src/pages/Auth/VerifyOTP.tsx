
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const otpSchema = z.object({
  otp: z.string().min(6, { message: "Please enter all digits" }).max(6)
});

type OTPFormValues = z.infer<typeof otpSchema>;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  });

  useEffect(() => {
    if (!email) {
      // Redirect to register if no email in state
      navigate('/auth/register');
      return;
    }
    
    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [email, navigate]);

  const onSubmit = (data: OTPFormValues) => {
    // In a real app, this would verify with a backend
    console.log("Verifying OTP:", data.otp, "for email:", email);
    
    // Simulate OTP verification
    if (data.otp === "123456") { // Example validation - in real app, this is done server-side
      toast.success("Email verified successfully!");
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error("Invalid OTP code. Please try again.");
    }
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setIsResending(true);
    
    // Simulate OTP resend
    setTimeout(() => {
      setIsResending(false);
      setCanResend(false);
      setCountdown(30);
      toast.success("New OTP has been sent to your email");
      
      // Restart countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-assistant-darkest">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-assistant-glow/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-assistant-blue/5 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md bg-assistant-dark/50 backdrop-blur-md border border-white/5 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold ai-gradient">Verify Your Email</CardTitle>
          <CardDescription className="text-muted-foreground">
            We've sent a verification code to {email || 'your email'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={form.watch('otp')}
                  onChange={(value) => form.setValue('otp', value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index}
                          className="w-12 h-14 text-lg bg-assistant-surface border-white/10"
                        />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              
              {form.formState.errors.otp && (
                <p className="text-destructive text-sm text-center">
                  {form.formState.errors.otp.message}
                </p>
              )}
              
              <Button type="submit" className="w-full">
                Verify <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 border-t border-white/5 pt-5">
          <div className="text-sm text-muted-foreground text-center">
            Didn't receive the code?
          </div>
          <Button
            variant="outline"
            className="w-full"
            disabled={!canResend || isResending}
            onClick={handleResendOTP}
          >
            {isResending ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : canResend ? (
              "Resend Code"
            ) : (
              `Resend in ${countdown}s`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;
