import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-background py-8 sm:px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row items-center mb-8">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <div className="sm:ml-8 mt-4 sm:mt-0 text-center sm:text-left">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64 mb-4" />
                        <div className="flex justify-center sm:justify-start space-x-2">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <Tabs defaultValue="creations" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                        {['Friends', 'Notifications', 'Account', 'Creations'].map((tab) => (
                            <TabsTrigger key={tab} value={tab.toLowerCase()} className="data-[state=active]:border-b data-[state=active]:border-primary">
                                <Skeleton className="h-4 w-16" />
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="creations">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton key={index} className="h-48 w-full rounded-lg" />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}