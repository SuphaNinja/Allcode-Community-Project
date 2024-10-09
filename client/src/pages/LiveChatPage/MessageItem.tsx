import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'

type User = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
    isCloseFriend?: boolean
}

type Message = {
    id: string
    content: string
    senderId: string
    receiverId: string
    read: boolean
    createdAt: string
    updatedAt: string
}

type MessageItemProps = {
    message: Message
    friend: User
    currentUser: User
    isLastMessage: boolean
    lastMessageRef: React.RefObject<HTMLDivElement>
}

export default function MessageItem({ message, friend, currentUser, isLastMessage, lastMessageRef }: MessageItemProps) {
    const isFriendMessage = message.senderId === friend.id;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`mb-4 flex ${isFriendMessage ? 'justify-start' : 'justify-end'}`}
            ref={isLastMessage ? lastMessageRef : null}
        >
            <div className={`flex items-end ${isFriendMessage ? 'flex-row' : 'flex-row-reverse'} sm:max-w-[50%]`}>
                <Avatar className="h-8 w-8 mb-2 mx-2">
                    <AvatarImage src={isFriendMessage ? friend.profileImage : currentUser.profileImage} alt={isFriendMessage ? friend.firstName : currentUser.firstName} />
                    <AvatarFallback>{isFriendMessage ? friend.firstName[0] : currentUser.firstName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-w-sm">
                    <div
                        className={`p-3 rounded-lg ${isFriendMessage
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary text-primary-foreground'
                            } shadow-md break-words`}
                    >
                        {message.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        {!isFriendMessage && message.read && (
                            <Check className="h-3 w-3 text-green-500 ml-1" />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}