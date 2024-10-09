import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

interface Friend {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    profileImage?: string;
    isFriend: boolean;
}

interface FriendsProps {
    friends: Friend[];
    isOwnProfile: boolean;
    totalFriends: number;
    onAddFriend: (friendId: string) => void;
    onRemoveFriend: (friendId: string) => Promise<void>;
    currentUserId: string;
    removingFriendId: string | null;
}

export default function Friends({ friends, isOwnProfile, totalFriends, onAddFriend, onRemoveFriend, currentUserId, removingFriendId }: FriendsProps) {
    return (
        <Card className="shadow-lg rounded-2xl border-neutral-800">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">Friends ({totalFriends})</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                className="flex hover:shadow-purple-500/50 hover:border-purple-500 hover:shadow-md items-center justify-between space-x-4 p-3 rounded-xl hover:brightness-125 transition-colors duration-200 border border-neutral-900 "
                            >
                                <Link to={`/profile/${friend.id}`} className="flex items-center space-x-4">
                                    <Avatar className="w-12 h-12 border-2 border-primary/10">
                                        {friend.profileImage ? (
                                            <AvatarImage src={friend.profileImage} alt={`${friend.firstName} ${friend.lastName}`} />
                                        ) : (
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {`${friend.firstName[0]}${friend.lastName[0]}`}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-foreground">{`${friend.firstName} ${friend.lastName}`}</p>
                                        <p className="text-sm text-muted-foreground">@{friend.userName}</p>
                                    </div>
                                </Link>
                                {friend.id === currentUserId ? (
                                    <Badge variant="secondary" className="ml-auto">You</Badge>
                                ) : (
                                    <>
                                        {!isOwnProfile && (
                                            friend.isFriend ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onRemoveFriend(friend.id)}
                                                    className="ml-auto"
                                                    disabled={removingFriendId === friend.id}
                                                >
                                                    {removingFriendId === friend.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <UserMinus className="h-4 w-4 mr-2" />
                                                            Unfriend
                                                        </>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onAddFriend(friend.id)}
                                                    className="ml-auto"
                                                >
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Add Friend
                                                </Button>
                                            )
                                        )}
                                        {isOwnProfile && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onRemoveFriend(friend.id)}
                                                className="ml-auto"
                                                disabled={removingFriendId === friend.id}
                                            >
                                                {removingFriendId === friend.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <UserMinus className="h-4 w-4 mr-2" />
                                                        Unfriend
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}