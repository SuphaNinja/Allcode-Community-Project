import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from "lucide-react"

type FriendWithLastMessage = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
    lastMessage?: {
        content: string
        createdAt: string
    }
    unreadCount: number
    isCloseFriend: boolean
}

type FriendListProps = {
    friends: FriendWithLastMessage[] | undefined | null
    isLoading: boolean
    onFriendSelect: (friend: FriendWithLastMessage) => void
    selectedFriendId: string | null
}

export default function FriendList({ friends, isLoading, onFriendSelect, selectedFriendId }: FriendListProps) {
    if (isLoading) {
        return (
            <ScrollArea className="h-[calc(100vh-140px)]">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center p-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4 space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                    </div>
                ))}
            </ScrollArea>
        )
    }

    if (!friends || friends.length === 0) {
        return (
            <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="flex items-center justify-center h-full">
                    <p className="text-neutral-400">No friends found</p>
                </div>
            </ScrollArea>
        )
    }

    const sortedFriends = [...friends].sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage) return 0;
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    });

    return (
        <ScrollArea className="h-[calc(100vh-140px)]">
            {sortedFriends.map((friend) => (
                <div
                    key={friend.id}
                    className="flex items-center p-4 text-neutral-300 cursor-pointer hover:bg-accent transition-colors duration-200"
                    onClick={() => onFriendSelect(friend)}
                >
                    <div className="flex items-center flex-grow">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.profileImage} alt={friend.firstName} />
                            <AvatarFallback>{friend.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-grow">
                            <div className="font-medium text-neutral-300 flex items-center">
                                {`${friend.firstName} ${friend.lastName}`}
                                {friend.isCloseFriend && (
                                    <Star className="h-4 w-4 ml-2 text-yellow-500 fill-current" />
                                )}
                            </div>
                            <div className="text-sm text-neutral-400 truncate w-40">
                                {friend.lastMessage ? friend.lastMessage.content : 'No messages yet'}
                            </div>
                        </div>
                        {friend.unreadCount > 0 && friend.id !== selectedFriendId && (
                            <Badge variant="destructive" className="ml-2">
                                {friend.unreadCount}
                            </Badge>
                        )}
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}