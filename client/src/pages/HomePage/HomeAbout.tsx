import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function HomeAbout() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <motion.div
            id="about"
            className="flex flex-col justify-center items-center border-b border-neutral-900 sm:mt-0 mt-56 py-16 sm:py-24 px-4 sm:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="flex flex-col max-w-4xl gap-8 md:gap-12">
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-bold text-center mb-8"
                >
                    About the <span className="text-purple-400 font-semibold">Allcode Community Project</span>
                </motion.h2>
                <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to the Community</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Discover a collaborative space where creativity thrives. Build and contribute unique pages, whether you're an experienced developer or just starting. Create interactive experiences and share your innovations with our vibrant community.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Easy Contribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Contributing is straightforward. Submit a pull request with your changes, and our team will review it for alignment with project <Link className="text-primary hover:underline" to="/guide">guidelines</Link>. We encourage adherence to our general style but welcome your personal touch.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Showcase Your Work</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Ensure your name is included at the bottom of your page for proper credit. Experienced contributors are also invited to assist with reviewing submissions to maintain the project's quality and consistency.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Smooth Contribution Process</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Prepare your page thoroughly before committing to minimize changes and streamline the process. This ensures your work is showcased effectively and efficiently.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants} className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Join Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Be part of our creative community. Connect with others, share your projects, and contribute to a space where creativity and collaboration are celebrated.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default HomeAbout;