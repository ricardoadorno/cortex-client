import { Link } from 'react-router-dom'
import { CheckSquare, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                    <CheckSquare className="h-12 w-12 text-primary mr-3" />
                    <h1 className="text-4xl font-bold text-foreground">
                        Cortex Task Manager
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Stay organized and boost your productivity with our intuitive task management system
                </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckSquare className="h-5 w-5 text-chart-1" />
                            Task Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Create, edit, and delete tasks with ease. Set due dates and track progress.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckSquare className="h-5 w-5 text-chart-2" />
                            Status Tracking
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Keep track of your tasks with To Do, In Progress, and Done status options.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckSquare className="h-5 w-5 text-chart-3" />
                            Due Dates
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Set deadlines and never miss important tasks with visual date indicators.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Ready to get started?</CardTitle>
                        <CardDescription>
                            Begin organizing your tasks and boost your productivity today.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/tasks">
                            <Button size="lg" className="w-full flex items-center gap-2">
                                Go to Tasks
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
