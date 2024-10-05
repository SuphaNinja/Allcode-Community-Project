import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

function HomeBottomSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background/90 to-background">
            <motion.div
                className="container mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <Card className="bg-primary/5 border-none">
                    <CardContent className="p-8">
                        <motion.div className="text-center mb-12" variants={itemVariants}>
                            <h2 className="bg-gradient-to-r font-bold from-pink-400 via-purple-500 to-indigo-500 text-xl bg-clip-text mb-4 sm:text-4xl lg:text-7xl tracking-tight text-transparent">
                                Join Our Creative Community
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Discover and contribute to a vibrant space where everyone can share their unique projects and ideas. Be part of something extraordinary!
                            </p>
                        </motion.div>

                        <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
                            <Button asChild size="lg" variant="link">
                                <Link to="/signup">Get Started</Link>
                            </Button>
                            <Button asChild variant="link" size="lg">
                                <a href="https://www.allcode.co/">Visit Allcode</a>
                            </Button>
                        </motion.div>   

                        <motion.div className="flex justify-center" variants={itemVariants}>
                            <a
                                href="https://github.com/SuphaNinja/allcode-community-project"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="text-4xl" />
                            </a>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}

export default HomeBottomSection;