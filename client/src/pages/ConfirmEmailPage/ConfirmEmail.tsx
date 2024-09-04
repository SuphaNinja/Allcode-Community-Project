import ModifiedNavBar from "@/components/ModifiedNavbar";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ParamsProps {
    token?: string;
    username?: string;
}

function ConfirmEmail({ currentUser } :any) {
    const { token, username } = useParams();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {toast} = useToast()

    const verify = useMutation({
        mutationFn: (data: ParamsProps) => axiosInstance.post("/api/auth/confirm-email", data),
        onSuccess: (data) => {
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);
            };

            currentUser.refetch()
            setIsTransitioning(true);
            toast({
                title: `Welcome ${username}!`,
                description: <p className="text-white">Your email has been verified.</p>,
                duration: 1500,
            });

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 1500);
        },
        onError: (error) => {
            console.error("Error confirming email:", error);
            navigate("/");
        },
    });

    useEffect(() => {
        if (token && username && token !== "1" && username !== "1") {
            verify.mutate({ token, username });
        }
    }, [token, username, verify.mutate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className={`absolute top-0 left-0 h-screen w-screen bg-slate-950 overflow-y-scroll`}>
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-screen bg-slate-950">
                        <p className="text-gray-800 text-lg font-medium">Loading...</p>
                    </div>
                ) : (
                <>
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={isTransitioning ? { x: 0 } : {}}
                        transition={{ duration: 1.5 }}
                        className={`overflow-x-hidden text-neutral-300  antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen ${isTransitioning ? "" : "hidden"}`}
                    >
                        <div className='container mx-auto px-8'>
                            <ModifiedNavBar />
                        </div>
                    </motion.div>
                        <div className={`${isTransitioning ? "hidden" : "flex flex-col bg-slate-950  items-center justify-center min-h-screen p-6"}`}>
                        {verify.isIdle && (
                            <p className="flex flex-col items-center text-neutral-300 text-lg font-medium border rounded-xl p-6 shadow-lg">
                                Check your inbox and verify your email...<br/> <span >You may now close this page.</span>
                            </p>
                        )}
                        {verify.isError && (
                            <p className="flex flex-col items-center text-red-600 text-lg font-medium border rounded-xl p-6 shadow-lg">
                                Error confirming email: <br/> <span>{verify.error.message}</span>
                            </p>
                        )}
                        {verify.isSuccess && (
                            <p className="flex flex-col items-center text-emerald-600 text-lg font-medium border rounded-xl p-6 shadow-lg">
                                Email confirmed successfully!<br /> <span>Redirecting...</span>
                            </p>
                        )}
                    </div>
                </>
                )}
            </div>
        </div>
    );
}

export default ConfirmEmail;
