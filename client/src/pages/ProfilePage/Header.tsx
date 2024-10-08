import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MailIcon, UsersIcon, UserPlusIcon, UserMinusIcon, Star, CheckCircle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import DeleteUserButton from './DeleteUserBtn'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { useToast } from "@/hooks/use-toast"

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
    createdAt: string;
    profileImage?: string;
    friends: any[];
    emailConfirmed: boolean;
}

interface ProfileHeaderProps {
    userData: UserData;
    isOwnProfile: boolean;
    isFriend: boolean;
    isCloseFriend: boolean;
    onAddFriend: () => void;
    onRemoveFriend: () => void;
    onToggleCloseFriend: () => void;
}

export default function Header({
    userData,
    isOwnProfile,
    isFriend,
    isCloseFriend,
    onAddFriend,
    onRemoveFriend,
    onToggleCloseFriend
}: ProfileHeaderProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        if (userData.profileImage) {
            const img = new Image()
            img.src = userData.profileImage
            img.onload = () => setImageLoaded(true)
            img.onerror = () => setImageLoaded(false)
        } else {
            setImageLoaded(false)
        }
    }, [userData.profileImage])

    const getRoleStyle = (role: string) => {
        switch (role.toUpperCase()) {
            case 'ADMIN':
                return 'text-red-500 font-bold';
            case 'USER':
                return 'text-green-500';
            case 'FOUNDER':
                return 'text-purple-500 font-bold animate-pulse';
            case 'BUILDER':
                return 'text-orange-500 font-semibold';
            default:
                return 'text-secondary-foreground';
        }
    };

    const sendVerificationEmail = useMutation({
        mutationFn: () => axiosInstance.post('/api/auth/send-verification-email'),
        onSuccess: () => {
            toast({
                title: "Verification Email Sent",
                description: "Please check your inbox and follow the instructions to verify your email.",
                duration: 5000,
            })
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to send verification email. Please try again later.",
                variant: "destructive",
                duration: 5000,
            })
        },
    })

    return (
        <Card className="mb-8 shadow-lg rounded-xl border-neutral-800">
            <CardHeader className="p-6">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <Avatar className="w-48 h-48">
                            <AvatarImage
                                src={userData.profileImage}
                                alt={`${userData.firstName} ${userData.lastName}`}
                            />
                            <AvatarFallback className="text-6xl">
                                {`${userData.firstName[0]}${userData.lastName[0]}`}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow flex flex-col justify-center md:h-48">
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-bold mb-2">{`${userData.firstName} ${userData.lastName}`}</h1>
                                <p className="text-2xl text-muted-foreground mb-2">@{userData.userName}</p>
                                <span className={`text-lg uppercase ${getRoleStyle(userData.role)}`}>
                                    {userData.role}
                                </span>
                                <div className="flex items-center mt-2">
                                    {userData.emailConfirmed ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Email Verified</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Email Not Verified</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                        {userData.emailConfirmed ? 'Verified' : 'Not Verified'}
                                    </span>
                                    {isOwnProfile && !userData.emailConfirmed && (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => sendVerificationEmail.mutate()}
                                            disabled={sendVerificationEmail.isPending}
                                            className="ml-2"
                                        >
                                            {sendVerificationEmail.isPending ? 'Sending...' : 'Verify'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!isOwnProfile ? (
                            <div className="flex sm:flex-row flex-col items-center justify-center md:h-48 space-y-2 sm:space-y-0 sm:space-x-2">
                                <TooltipProvider>
                                    {isFriend ? (
                                        <>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" onClick={onToggleCloseFriend} className="w-full md:w-auto" aria-label={isCloseFriend ? "Remove from close friends" : "Add to close friends"}>
                                                        <Star className={`h-7 w-7 ${isCloseFriend ? 'text-yellow-500 fill-current' : ''}`} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {isCloseFriend ? "Remove from close friends" : "Add to close friends"}
                                                </TooltipContent>
                                            </Tooltip>
                                            <Button variant="ghost" onClick={onRemoveFriend} className="w-full md:w-auto">
                                                <UserMinusIcon className="mr-2 h-5 w-5" /> Remove Friend
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={onAddFriend} className="w-full md:w-auto">
                                            <UserPlusIcon className="mr-2 h-5 w-5" /> Add Friend
                                        </Button>
                                    )}
                                </TooltipProvider>
                            </div>
                        ) : (
                            <div className="flex sm:flex-row flex-col items-center justify-center md:h-48 space-y-2">
                                <DeleteUserButton />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly items-center md:items-end space-y-4 md:space-y-0 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <MailIcon className="h-4 w-4" aria-hidden="true" />
                            <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                            <span>Joined {format(new Date(userData.createdAt), 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <UsersIcon className="h-4 w-4" aria-hidden="true" />
                            <span>{userData.friends.length} {userData.friends.length === 1 ? 'Friend' : 'Friends'}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}