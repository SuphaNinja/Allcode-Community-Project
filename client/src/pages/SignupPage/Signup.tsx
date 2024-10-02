import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import { Button } from "@/components/ui/button";

export default function SignUp() {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign up to get started
                    </p>
                </div>

                <SignUpForm />

                <div className="text-center">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Button asChild variant="link">
                        <Link to="/signin">Sign In</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}