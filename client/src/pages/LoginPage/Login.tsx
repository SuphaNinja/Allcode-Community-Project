import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const loginSchema = z.object({
    email: z.string().min(4, "Invalid email or username"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login (currentUser:any) {

    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (currentUser.isSuccess && currentUser.data.data.success) {
            navigate("/")
        }
    },[currentUser]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const login = useMutation({
        mutationFn: (data: LoginFormValues) => axiosInstance.post("/api/users/login", data),
        onSuccess: (data) => {
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);

                setIsLoading(true)
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                    toast({
                        title: `Welcome!`,
                        description: <p className="text-white">You've been logged in successfully.</p>,
                        duration: 1500,
                    });
                }, 1000);
            };
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        login.mutate(data);
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">
                        Sign In
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email or Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email or username" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={login.isPending}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="text-center space-y-2">
                    <Button asChild variant="link">
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </Button>
                    <div>
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Button asChild variant="link">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}