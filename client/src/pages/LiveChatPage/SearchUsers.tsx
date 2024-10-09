import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserPlus } from "lucide-react"
import { UseMutationResult } from '@tanstack/react-query'

type User = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
}

type SearchUsersProps = {
    users: User[]
    isLoading: boolean
    addFriend: UseMutationResult<any, unknown, string, unknown>
    friends: User[] | undefined
}

export default function SearchUsers({ users, isLoading, addFriend, friends }: SearchUsersProps) {
    if (isLoading) {
        return (
            <ScrollArea className="h-[calc(100vh-140px)] ">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex w-full items-center  justify-between p-4 border-b border-gray-800">
                        <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-full  bg-gray-700" />
                            <div className="ml-4 space-y-2">
                                <Skeleton className="h-4 w-[200px] rounded-xl bg-gray-700" />
                                <Skeleton className="h-4 w-[150px] rounded-xl bg-gray-700" />
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        )
    }

    return (
        <ScrollArea className="h-[calc(100vh-140px)]">
            {users.map((user) => {
                const [isFriend, setIsFriend] = useState(friends?.some((friend) => friend.id === user.id) ?? false);
                const handleAddFriend = () => {
                    setIsFriend(true)
                    addFriend.mutate(user.id)
                }
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
                        {!isFriend && (
                            <Button size="sm" onClick={handleAddFriend}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        )}
                    </div>
                )
            })}
        </ScrollArea>
    )
}