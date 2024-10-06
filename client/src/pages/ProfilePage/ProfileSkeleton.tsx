import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-4xl mx-auto flex flex-col">
                <Card className="mb-8 rounded-xl border border-neutral-800 shadow-xl">
                    <CardHeader className="pb-0">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-32 h-32 rounded-full" />
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </CardContent>
                </Card>

                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
                <Card className="mb-8 rounded-xl border border-neutral-800 shadow-xl">
                    <CardHeader className="pb-0">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="w-32 h-32 rounded-full" />
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </CardContent>
                </Card>

                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    )
}