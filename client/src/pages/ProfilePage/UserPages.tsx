import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Page {
    name: string;
    shortDescription: string;
    description: string;
    path: string;
    trending: boolean;
    createdBy: string;
    creatorProfileImage: string | undefined;
    role: string;
    createdAt: Date;
    image: string;
}

interface UserPagesProps {
    pages: Page[];
}

export function UserPages({ pages }: UserPagesProps) {
    const getRoleColor = (role: string) => {
        switch (role.toUpperCase()) {
            case 'ADMIN':
                return 'text-red-500 font-bold';
            case 'USER':
                return 'text-green-500';
            case 'FOUNDER':
                return 'text-purple-500 font-bold';
            case 'BUILDER':
                return 'text-orange-500 font-semibold';
            default:
                return 'text-secondary-foreground';
        }
    };

    return (
        <Card className="shadow-lg rounded-xl border-neutral-800">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">Created Pages</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                    {pages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pages.map((page) => (
                                <Link to={page.path} key={page.path} className="flex hover:shadow-purple-500/50 hover:border-purple-500 hover:shadow-md  flex-col overflow-hidden border border-neutral-900 rounded-xl transition-shadow">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={page.image} alt={page.name} className="w-full h-full object-cover" />
                                        {page.trending && (
                                            <Badge variant="default" className="absolute top-2 right-2">
                                                Trending
                                            </Badge>
                                        )}
                                    </div>
                                    <CardContent className="flex-grow flex flex-col p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-semibold">{page.name}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{page.shortDescription}</p>
                                        <div className="flex items-center mt-auto">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={page.creatorProfileImage && page.creatorProfileImage} />
                                                <AvatarFallback>{page.createdBy.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{page.createdBy}</p>
                                                <p className={`text-xs ${getRoleColor(page.role)}`}>{page.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-xs text-muted-foreground">
                                                Created on {format(new Date(page.createdAt), 'MMM d, yyyy')}
                                            </p>
                                            <Link to={page.path}>
                                                <Button variant="link" size="sm">View Page</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">No pages created yet.</p>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}