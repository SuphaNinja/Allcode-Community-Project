import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    
    if (location.pathname === '/livechat') {
        return null;
    }

    return (
        <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">A.C.P</h3>
                        <p className="text-sm text-muted-foreground">
                            Empowering developers to connect, collaborate, and create amazing projects.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Button asChild variant="link" className="p-0 h-auto">
                                    <Link to="/">Home</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="p-0 h-auto">
                                    <Link to="/guide">Guide</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="p-0 h-auto">
                                    <Link to="/contact">Contact</Link>
                                </Button>
                            </li>
                            <li>
                                <Button asChild variant="link" className="p-0 h-auto">
                                    <Link to="/privacy">Privacy Policy</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Button asChild variant="ghost" size="icon">
                                <a href="https://github.com/SuphaNinja/allcode-community-project" className="hover:scale-125 transition-all" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </Button>
                            <Button asChild variant="ghost" size="icon">
                                <a href="https://www.linkedin.com/in/sid-rico-bj%C3%B6rk/" className="hover:scale-125 transition-all" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="text-center text-sm text-muted-foreground">
                    © {currentYear} A.C.P. All rights reserved.
                </div>
            </div>
        </footer>
    );
}