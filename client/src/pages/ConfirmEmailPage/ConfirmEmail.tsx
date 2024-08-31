import ModifiedNavBar from "@/components/ModifiedNavbar";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ParamsProps {
    token?: string;
    username?: string;
}

function ConfirmEmail() {
    const { token, username } = useParams();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { mutate, isIdle, isError, isSuccess, error } = useMutation({
        mutationFn: (data: ParamsProps) => axiosInstance.post("/api/auth/confirm-email", data),
        onSuccess: () => {
            setIsTransitioning(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        },
        onError: (error) => {
            console.error("Error confirming email:", error);
            navigate("/");
        }
    });

    useEffect(() => {
        if (token && username && token !== "1" && username !== "1") {
            mutate({ token, username });
        }
    }, [token, username, mutate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className={`absolute top-0 left-0 h-screen w-screen ${isTransitioning ? "bg-slate-950" : "bg-gray-50"} overflow-y-scroll`}>
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <p className="text-gray-800 text-lg font-medium">Loading...</p>
                    </div>
                ) : (
                <>
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={isTransitioning ? { x: 0 } : {}}
                        transition={{ duration: 2.5 }}
                        className={`overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen ${isTransitioning ? "" : "hidden"}`}
                    >
                        <div className='container mx-auto px-8'>
                            <ModifiedNavBar />
                        </div>
                    </motion.div>
                    <div className={`${isTransitioning ? "hidden" : "flex flex-col items-center justify-center min-h-screen p-6"}`}>
                        {isIdle && (
                            <p className="text-gray-800 text-lg font-medium bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-lg">
                                Check your inbox and verify your email...
                            </p>
                        )}
                        {isError && (
                            <p className="text-red-900 text-lg font-medium bg-red-50 border border-red-200 rounded-lg p-6 shadow-lg">
                                Error confirming email: {error.message}
                            </p>
                        )}
                        {isSuccess && (
                            <p className="text-green-900 text-lg text-center font-medium bg-green-50 border border-green-200 rounded-lg p-6 shadow-lg">
                                Email confirmed successfully!<br />Redirecting...
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
