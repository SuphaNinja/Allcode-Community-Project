
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mb-4">The page you're looking for doesn't exist.</p>
                <Link to="/" className="text-blue-500 hover:underline">
                    Go back to homepage
                </Link>
            </div>
        </div>
    );
}

export default NotFound;