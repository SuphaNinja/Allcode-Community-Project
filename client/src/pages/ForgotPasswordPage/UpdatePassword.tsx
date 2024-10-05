import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormLabel, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import axiosInstance from '@/lib/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const updatePassSchema = z.object({
    email: z.string().email("Invalid email address"),
    token: z.string(),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type UpdatePassFormValues = z.infer<typeof updatePassSchema>;

function UpdatePassword() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { token, email } = useParams();

    const form = useForm<UpdatePassFormValues>({
        resolver: zodResolver(updatePassSchema),
        defaultValues: {
            email: email || "",
            token: token || "",
        }
    });

    const updatePassword = useMutation({
        mutationFn: (data: UpdatePassFormValues) => axiosInstance.post("/api/auth/update-password", data),
        onSuccess: (data) => {
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);

                queryClient.invalidateQueries({ queryKey: ["currentUser"] });

                toast({
                    title: `Success!`,
                    description: <p className="text-white">Your password has been updated.</p>,
                    duration: 1500,
                });

                navigate("/");
            };
        },
        onError: () => {
            toast({
                title: `Oops!`,
                description: <p className="text-white">Something went wrong, please try again later.</p>
            });
        }
    });

    const onSubmit = (data: UpdatePassFormValues) => {
        updatePassword.mutate(data);
    };

    return (
        <div>
            <div className={`absolute top-24 left-0 h-screen  bg-slate-950 overflow-y-scroll`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid px-4 sm:w-1/3 mx-auto grid-cols-1 mt-36 pb-8 gap-8">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your new password" type="password" {...field} />
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
                                        <Input placeholder="Confirm your new password" type="password" {...field} />
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
                                Update Password
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default UpdatePassword;
