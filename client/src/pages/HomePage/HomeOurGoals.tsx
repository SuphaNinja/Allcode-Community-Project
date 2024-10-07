import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeOurGoals() {

    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    const handleViewGuidelines = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate('/guide'), 400); 
    };

    return (
        <motion.div
            id="ourGoals"
            className="flex flex-col justify-center items-center border-b border-neutral-900 py-16 md:py-24 px-4 md:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="flex flex-col max-w-4xl gap-8 md:gap-12 w-full">
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-bold text-center mb-8"
                >
                    Our <span className="text-purple-400 font-semibold">Goals</span>
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    className="grid gap-6 md:grid-cols-2"
                >
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Celebrate Creativity and Diversity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our main goal is to cultivate a vibrant community where creativity thrives. We want every page to be a unique expression of its creator's vision, reflecting the rich diversity of ideas within our community.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Foster Exploration and Engagement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We aim to create an environment where every visit is a new adventure. Explore a variety of unique pages—from interactive games to personal showcases—that captivate and engage users.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Promote Collaborative Growth</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Collaboration is essential to our success. We encourage open and supportive interactions where members can share knowledge, inspire each other, and grow together.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Uphold High Quality Standards</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    While embracing creativity, we maintain high standards of quality. We ensure that submissions meet our guidelines, allowing for personal expression while maintaining consistency.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Encourage Continuous Innovation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We are committed to inspiring ongoing innovation. Our platform evolves with new features and tools, empowering our community to push the boundaries of creativity.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-xl border border-neutral-700">
                            <CardHeader>
                                <CardTitle>Build a Supportive Community</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We are dedicated to fostering a supportive and inclusive community where every member feels valued. By celebrating each other's successes, we ensure that everyone can thrive and enjoy their journey with us.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center mt-8">
                    <Button
                        size="lg"
                        onClick={handleViewGuidelines}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        <span className="mr-2">View Guidelines</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline-block rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}