import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MessageCircle } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import FriendList from './FriendList'
import SearchUsers from './SearchUsers'

type User = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
}

type SidebarProps = {
    onFriendSelect: (friend: User) => void
    selectedFriendId: string | null
}

export default function Sidebar({ onFriendSelect, selectedFriendId }: SidebarProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("")
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [ isAddingFriend, setIsAddingFriend ] = useState(false);

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
        onMutate: () => setIsAddingFriend(true),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] })
            queryClient.invalidateQueries({ queryKey: ['allUsers'] })
        },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to add friend. Please try again.</p>,
                variant: "destructive",
            })
        },
        onSettled: () => setIsAddingFriend(false)
    });

    const filteredUsers = allUsers?.data?.success?.filter((user: User) =>
        user.id !== currentUser?.data?.success.id &&
        (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

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
                        className="pl-8 border border-neutral-700 rounded-xl"
                    />
                </div>
            </div>
            <TabsContent value="friends">
                <FriendList
                    friends={friends?.data?.success}
                    isLoading={isFriendsLoading}
                    onFriendSelect={onFriendSelect}
                    selectedFriendId={selectedFriendId}
                />
            </TabsContent>
            <TabsContent value="search">
                <SearchUsers
                    users={filteredUsers}
                    isLoading={isAllUsersLoading}
                    addFriend={addFriend}
                    friends={friends?.data?.success}
                    isAddingFriend={isAddingFriend}
                />
            </TabsContent>
        </Tabs>
    )
}