import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useState } from "react";


const resetPassSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ResetPassFormValues = z.infer<typeof resetPassSchema>;

function ForgotPassword() {
    const [ emailSent, setEmailSent ] = useState(false);

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
        <div className="absolute top-0 left-0 h-screen w-screen bg-slate-950 overflow-y-scroll">
            {emailSent ? (
                <div className="flex flex-col items-center justify-center min-h-screen p-6">
                    <p className="flex flex-col items-center text-neutral-300 text-lg font-medium border rounded-xl p-6 shadow-lg">
                        An email was sent to you with instructions to reset your password. <br /> <span>You may now close this page.</span>
                    </p>
                </div>
            ) : (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid px-4 sm:w-1/3 mx-auto grid-cols-1 mt-36 pb-8 gap-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email or username" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            className="w-full sm:w-1/2 mx-auto py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                            type="submit"
                        >
                            Reset password
                        </Button>
                    </div>
                </form>
            </Form>
            )}
        </div>
    );
}

export default ForgotPassword;