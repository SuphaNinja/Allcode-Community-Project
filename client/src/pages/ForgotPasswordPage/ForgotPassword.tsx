import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const resetPassSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ResetPassFormValues = z.infer<typeof resetPassSchema>;

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<ResetPassFormValues>({
        resolver: zodResolver(resetPassSchema),
    });

    const resetPassword = useMutation({
        mutationFn: (data: ResetPassFormValues) => axiosInstance.post("/api/auth/reset-password", data),
        onSuccess: () => {
            setEmailSent(true);
        }
    });

    const onSubmit = (data: ResetPassFormValues) => {
        resetPassword.mutate(data);
    };

    return (
        <div className="min-h-screen flex flex-col items-center  px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your email address to reset your password
                    </p>
                </div>

                {emailSent ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <p className="font-bold">Email Sent</p>
                        <p className="text-sm">An email was sent to you with instructions to reset your password.</p>
                        <p className="text-sm mt-2">You may now close this page.</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={resetPassword.isPending}
                            >
                                {resetPassword.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                )}

                <div className="mt-4 text-center">
                    <Button
                        asChild
                        variant="link"
                        className="inline-flex items-center text-sm"
                    >
                        <Link to="/signin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;