import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-background py-8 sm:px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <Card className="shadow-lg rounded-2xl border-neutral-800 mb-8">
                    <CardHeader className="pb-0">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <Skeleton className="w-32 h-32 rounded-full bg-gray-700" />
                            <div className="flex-1 space-y-2 text-center sm:text-left">
                                <Skeleton className="h-8 w-48 mx-auto sm:mx-0 bg-gray-700 rounded-xl" />
                                <Skeleton className="h-6 w-32 mx-auto sm:mx-0 bg-gray-700 rounded-xl" />
                                <Skeleton className="h-6 w-24 mx-auto sm:mx-0 bg-gray-700 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="h-10 w-32 bg-gray-700 rounded-xl" />
                                <Skeleton className="h-10 w-32 bg-gray-700 rounded-xl" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-8 w-full bg-gray-700 rounded-xl" />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Skeleton */}
                <Tabs defaultValue="creations" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
                        {["friends", "notifications", "account", "creations"].map((tab) => (
                            <TabsTrigger key={tab} value={tab} className="data-[state=active]:border-b data-[state=active]:border-primary">
                                <Skeleton className="h-6 w-20 bg-gray-700 rounded-xl" />
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {["friends", "notifications", "account", "creations"].map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            <Card className="shadow-lg rounded-2xl border-neutral-800">
                                <CardHeader>
                                    <Skeleton className="h-8 w-48 bg-gray-700 rounded-xl" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[...Array(6)].map((_, index) => (
                                            <div key={index} className="flex w-full items-center justify-between p-4 border-b border-gray-800">
                                                <div className="flex items-center w-full">
                                                    <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
                                                    <div className="ml-4 space-y-2 flex-grow">
                                                        <Skeleton className="h-4 w-[200px] rounded-xl bg-gray-700" />
                                                        <Skeleton className="h-4 w-[150px] rounded-xl bg-gray-700" />
                                                    </div>
                                                    <Skeleton className="h-8 w-24 rounded-xl bg-gray-700 ml-4" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}