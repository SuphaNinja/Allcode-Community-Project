import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MailIcon, UsersIcon, UserPlusIcon, UserMinusIcon, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
    createdAt: string;
    profileImage?: string;
    friends: any[]
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

    return (
        <Card className="mb-8 shadow-lg rounded-xl border-neutral-800">
            <CardHeader className="p-6">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <Avatar className="w-48 h-48">
                            {userData.profileImage && imageLoaded ? (
                                <img
                                    src={userData.profileImage}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <AvatarFallback className="text-6xl">
                                    {`${userData.firstName[0]}${userData.lastName[0]}`}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex-grow flex flex-col justify-center md:h-48">
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-bold mb-2">{`${userData.firstName} ${userData.lastName}`}</h1>
                                <p className="text-2xl text-muted-foreground mb-2">@{userData.userName}</p>
                                <span className={`text-lg uppercase ${getRoleStyle(userData.role)}`}>
                                    {userData.role}
                                </span>
                            </div>
                        </div>
                        {!isOwnProfile && (
                            <div className="flex sm:flex-row flex-col items-center justify-center md:h-48 space-y-2">
                                {isFriend ? (
                                    <>
                                        <Button variant="ghost" onClick={onToggleCloseFriend} className="w-full md:w-auto">
                                            <Star className={`h-7 w-7 ${isCloseFriend ? 'text-yellow-500 fill-current' : ''}`} />
                                        </Button>
                                        <Button variant="ghost" onClick={onRemoveFriend} className="w-full md:w-auto">
                                            <UserMinusIcon className="mr-2 h-5 w-5" /> Remove Friend
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={onAddFriend} className="w-full md:w-auto">
                                        <UserPlusIcon className="mr-2 h-5 w-5" /> Add Friend
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly items-center md:items-end space-y-4 md:space-y-0 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <MailIcon className="h-4 w-4" />
                            <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Joined {format(new Date(userData.createdAt), 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <UsersIcon className="h-4 w-4" />
                            <span>{userData.friends.length} {userData.friends.length === 1 ? 'Friend' : 'Friends'}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}