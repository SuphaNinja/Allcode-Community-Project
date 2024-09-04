import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from "react";
import { motion } from "framer-motion";
import ModifiedNavBar from "@/components/ModifiedNavbar";

const loginSchema = z.object({
    email: z.string().min(4, "Invalid email or usename"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login({ currentUser }: any) {
    const [ isTransitioning, setIsTransitioning ] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const login = useMutation({
        mutationFn: (data: LoginFormValues) => axiosInstance.post("/api/users/login", data),
        onSuccess: (data) => {
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);
                currentUser.refetch()
                toast({
                    title: `Welcome!`,
                    description: <p className="text-white">You've been logged in successfully.</p>,
                    duration: 1500,
                });
                
                setIsTransitioning(true);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1500);
            };
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        login.mutate(data);
        console.log("logindata", data)
    };

    return (
        <div> 
            <div className={`absolute top-0 left-0 h-screen w-screen bg-slate-950 overflow-y-scroll`}>
                <motion.div
                    initial={{ x: '-100vw' }}
                    animate={isTransitioning ? { x: 0 } : {}}
                    transition={{ duration: 1.5 }}
                    className={`overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen ${isTransitioning ? "" : "hidden"}`}
                >
                    <div className='container mx-auto px-8'>
                        <ModifiedNavBar />
                    </div>
                </motion.div>
                <div className="text-center border-b mt-24 mb-2 border-slate-900 w-1/2 mx-auto pb-2">
                    Not signed up yet?
                    <Button asChild variant={"link"}>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid px-4 sm:w-1/2 mx-auto grid-cols-1 pb-8 gap-8">
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
                        <div className="flex justify-end">
                            <Button
                                className="w-full sm:w-1/2 mx-auto py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                type="submit"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="w-full flex justify-center">
                    <Button asChild variant={"link"}>
                        <Link to="/forgot-password" className="mx-auto">Forgot your password?</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
