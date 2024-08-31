import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ModifiedNavBar = () => {
    return (
        <nav className=" flex sm:flex-row flex-col items-center border-b border-slate-800 justify-between py-8">
            <div
                className="flex flex-shrink-0 items-center text-xl font-semibold sm:text-4xl">
                <a href="/">{"</>"} A.C.P</a>
            </div>
            <div className="m-8 flex sm:flex-row flex-col items-center justify-center gap-4 text-2xl">
                <div>
                    <div
                        
                        className="inline-block"
                    >
                        <Button asChild variant={"link"}>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                    <div
                        
                        className="inline-block"
                    >
                        <Button asChild variant={"link"}>
                            <Link to="/signin">
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="inline-block">
                        <a
                            className="inline-block transition-transform duration-300"
                            href="https://www.linkedin.com/in/sid-rico-bj%C3%B6rk/"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                    <div
                        
                        className="inline-block"
                    >
                        <a
                            className="inline-block hover:scale-150 transition-transform duration-300"
                            href="https://github.com/SuphaNinja/allcode-community-project"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default ModifiedNavBar;