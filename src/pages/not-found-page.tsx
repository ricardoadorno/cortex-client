import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
    return (
        <div className="text-center py-16">
            <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist.
            </p>
            <Button asChild>
                <Link to="/">
                    Go Back Home
                </Link>
            </Button>
        </div>
    )
}
