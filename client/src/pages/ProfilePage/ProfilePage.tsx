import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListOfPages } from '@/lib/ListOfPages'
import ProfileSkeleton from './ProfileSkeleton'
import Friends from './Friends'
import Notifications from './Notifications'
import { UserPages } from './UserPages'
import AccountInfo from './AccountInfo'
import Header from './Header'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"

interface Notification {
    id: string
    type: string
    content: string
    createdAt: string
    read: boolean
    linkUrl: string
}

export default function Profile({ currentUser }: any) {
    const { userId } = useParams()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [isCloseFriend, setIsCloseFriend] = useState(false)

    const user = useQuery({
        queryKey: ["user", userId],
        queryFn: () => axiosInstance.post("/api/users/get-user-by-id", { userId }),
    });

    useEffect(() => {
        if (user.data?.data.success && currentUser.data?.data.success) {
            const currentUserFriend = user.data.data.success.friends.find(
                (f: any) => f.id === currentUser.data.data.success.id
            );
            setIsCloseFriend(currentUserFriend?.isCloseFriend || false);
        }
    }, [user.data, currentUser.data]);

    const addFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post("/api/users/add-friend", { friendId }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['user', userId] }) },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to add friend. Please try again.</p>,
                variant: "destructive",
            })
        },
    });

    const removeFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post(`/api/users/remove-friend`, { friendId }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['user', userId] }) },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to remove friend. Please try again.</p>,
                variant: "destructive",
            })
        },
    });

    const toggleCloseFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post("/api/users/toggle-close-friend", { friendId }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] })
            setIsCloseFriend(data.data.success.isCloseFriend)
        },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Error updating close friend status. Try refreshing the page and try again.</p>,
                variant: "destructive",
            })
        },
    })

    const noti = useQuery({
        queryKey: ["notifications"],
        queryFn: () => axiosInstance.get<{ success: Notification[] }>("/api/users/get-notifications")
    });
    const notifications = noti.data?.data.success || [];
    const unreadCount = notifications.filter(notification => !notification.read).length

    const handleToggleCloseFriend = () => {
        if (user.data?.data.success) {
            toggleCloseFriend.mutate(user.data.data.success.id)
        }
    }

    if (!currentUser.data?.data.success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Alert className="max-w-xl border-neutral-800 rounded-xl">
                    <AlertTitle>Authentication Required</AlertTitle>
                    <AlertDescription>
                        You need to be logged in to view user profiles. Please log in and try again.
                        <Button asChild variant={"link"}>
                            <Link to="/signin" className="block mt-2 text-primary hover:underline">Sign In</Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        )
    };

    if (user.isLoading) { return <ProfileSkeleton /> }

    if (user.isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Alert variant="destructive" className="max-w-md border-neutral-800 rounded-xl">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        There was an error loading the user profile. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    const userData = user.data?.data.success
    if (!userData) {
        return (
            <div className="min-h-screen flex items-center border-neutral-800 rounded-xl justify-center bg-background">
                <Alert className="max-w-md">
                    <AlertTitle>User Not Found</AlertTitle>
                    <AlertDescription>
                        The requested user profile could not be found.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    const isOwnProfile = currentUser.data.data.success.id === userData.id
    const isFriend = userData.friends.some((friend: any) => friend.id === currentUser.data.data.success.id)

    const userCreatedPages = ListOfPages
        .filter(page => page.createdBy === userData.userName)
        .map(page => ({
            ...page,
            creatorProfileImage: userData.profileImage
        }));

    const friendsData = userData.friends.map((friend: any) => ({
        ...friend,
        isFriend: true
    }));

    return (
        <div className="min-h-screen bg-background py-8 sm:px-4">
            <div className="max-w-6xl mx-auto">
                <Header
                    userData={userData}
                    isOwnProfile={isOwnProfile}
                    isFriend={isFriend}
                    isCloseFriend={isCloseFriend}
                    onAddFriend={() => addFriend.mutate(userData.id)}
                    onRemoveFriend={() => removeFriend.mutate(userData.id)}
                    onToggleCloseFriend={handleToggleCloseFriend}
                />

                <Tabs defaultValue="creations" className="w-full">
                    <TabsList className={`${isOwnProfile ? "grid w-full sm:mb-0 mb-12 grid-cols-2 sm:grid-cols-4" : "grid w-full grid-cols-2"}`}>
                        <TabsTrigger
                            value="friends"
                            className="data-[state=active]:border-b data-[state=active]:border-primary"
                        >
                            Friends
                        </TabsTrigger>
                        <TabsTrigger
                            className={`${!isOwnProfile && "hidden"} data-[state=active]:border-b data-[state=active]:border-primary relative`}
                            value="notifications"
                        >
                            Notifications
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-2 ">
                                    {unreadCount} New
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            className={`${!isOwnProfile && "hidden"} data-[state=active]:border-b data-[state=active]:border-primary`}
                            value="account"
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger
                            value="creations"
                            className="data-[state=active]:border-b data-[state=active]:border-primary"
                        >
                            Creations
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="friends">
                        <Friends
                            friends={friendsData}
                            isOwnProfile={isOwnProfile}
                            totalFriends={userData.friends.length}
                            currentUserId={currentUser.data.data.success.id}
                            onAddFriend={(friendId) => addFriend.mutate(friendId)}
                            onRemoveFriend={(friendId) => removeFriend.mutate(friendId)}
                        />
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Notifications notifications={notifications} unreadCount={unreadCount} />
                    </TabsContent>
                    <TabsContent value="account">
                        <AccountInfo currentUser={currentUser.data.data.success} />
                    </TabsContent>
                    <TabsContent value="creations">
                        <UserPages pages={userCreatedPages} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}