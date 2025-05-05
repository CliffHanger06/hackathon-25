
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, this would call an API
    console.log("Password reset request for:", data.email);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Password reset instructions sent to your email!");
      
      // Navigate to OTP verification (as if we've sent a reset code)
      navigate('/auth/verify-otp', { state: { email: data.email } });
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
          <CardTitle className="text-2xl font-bold ai-gradient">Reset Password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to receive a password reset code
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="you@example.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Reset Code <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="border-t border-white/5 pt-5">
          <div className="text-sm text-muted-foreground text-center w-full">
            <Link to="/auth/login" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
