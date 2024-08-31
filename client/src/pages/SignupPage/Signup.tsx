import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import { Button } from "@/components/ui/button";




export default function SignUp() {
    
    return (
        <div className="mt-6 sm:mt-12">
            <div className="text-center border-b mb-2 border-slate-900 w-1/2 mx-auto pb-2">
                Already have an account? 
                <Button asChild variant={"link"}>
                    <Link to="/signin">Sign In</Link>
                </Button>
            </div>
            <SignUpForm />
        </div>
    );
}
