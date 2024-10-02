import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MessageCircle, Star } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

type User = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
}

type FriendWithLastMessage = User & {
    lastMessage?: {
        content: string
        createdAt: string
    }
    unreadCount: number
    isCloseFriend: boolean
}

type SidebarProps = {
    onFriendSelect: (friend: User) => void
}

export default function Sidebar({ onFriendSelect }: SidebarProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("")
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: currentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => axiosInstance.get("/api/users/get-current-user"),
    });

    useEffect(() => {
        if (isCurrentUserError || (!isCurrentUserLoading && !currentUser?.data.success)) {
            navigate("/signin", { replace: true });
        }
    }, [currentUser, isCurrentUserLoading, isCurrentUserError, navigate]);

    const { data: allUsers, isLoading: isAllUsersLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () => axiosInstance.get("/api/users/get-all-users"),
    });

    const { data: friends, isLoading: isFriendsLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: () => axiosInstance.get("/api/users/get-friends-with-last-message"),
    });

    const addFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post("/api/users/add-friend", { friendId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] })
            toast({
                title: "Friend added",
                description: <p className='text-neutral-300'>You've successfully added a new friend.</p>,
            })
        },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to add friend. Please try again.</p>,
                variant: "destructive",
            })
        },
    });

    const filteredUsers = allUsers?.data?.success?.filter((user: User) =>
        user.id !== currentUser?.data?.success.id &&
        (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

    const sortedFriends = (friends?.data?.success || []).sort((a: FriendWithLastMessage, b: FriendWithLastMessage) => {
        if (!a.lastMessage && !b.lastMessage) return 0;
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    });

    function FriendList() {
        if (isFriendsLoading) {
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

        return (
            <ScrollArea className="h-[calc(100vh-140px)]">
                {sortedFriends.map((friend: FriendWithLastMessage) => (
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
                            {friend.unreadCount > 0 && (
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

    const SearchUsers = () => (
        <ScrollArea className="h-[calc(100vh-140px)]">
            {isAllUsersLoading ? (
                [...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="ml-4 space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-[100px]" />
                    </div>
                ))
            ) : (
                filteredUsers.map((user: User) => {
                    const isFriend = friends?.data?.success.some((friend: User) => friend.id === user.id);
                    return (
                        <div key={user.id} className="flex items-center justify-between p-4 text-neutral-300 hover:bg-accent transition-colors duration-200">
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user?.profileImage} alt={user.userName} />
                                    <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <div className="font-medium text-neutral-300">{`${user.firstName} ${user.lastName}`}</div>
                                    <div className="text-sm text-neutral-400">{user.email}</div>
                                </div>
                            </div>
                            {isFriend ? (
                                <></>
                            ) : (
                                <Button size="sm" onClick={() => addFriend.mutate(user.id)}>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            )}
                        </div>
                    )
                })
            )}
        </ScrollArea>
    );

    if (isCurrentUserLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Skeleton className="h-[400px] w-[300px]" />
            </div>
        )
    }

    return (
        <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                <TabsTrigger
                    value="friends"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className='text-neutral-300'>Chats</span>
                </TabsTrigger>
                <TabsTrigger
                    value="search"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span className='text-neutral-300'>Add New</span>
                </TabsTrigger>
            </TabsList>
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>
            <TabsContent value="friends">
                <FriendList />
            </TabsContent>
            <TabsContent value="search">
                <SearchUsers />
            </TabsContent>
        </Tabs>
    )
}