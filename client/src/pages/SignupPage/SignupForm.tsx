import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage, } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from "lucide-react";

const userSchema = z.object({
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters long")
        .max(25, "First name must be at most 25 characters long"),
    lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .max(25, "Last name must be at most 25 characters long"),
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(10, "Username must be at most 10 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type UserFormValues = z.infer<typeof userSchema>;

export default function SignUpForm() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });

    const signUp = useMutation({
        mutationFn: (data: UserFormValues) => axiosInstance.post("/api/users/signup", data),
        onSuccess: () => {
            navigate("/confirm-email/token/1/username/1")
        },
        onError: () => {
            toast({
                title: "Oops",
                description: "Something went wrong, please try again later.",
                variant: "destructive"
            });
        }
    });

    const onSubmit = (data: UserFormValues) => {
        signUp.mutate(data)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="janedoe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="jane.doe@example.com"
                                    type="email"
                                    {...field}
                                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                    disabled={signUp.isPending}
                >
                    {signUp.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing Up...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>
        </Form>
    );
}