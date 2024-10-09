import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Check, Star, UserMinus, ChevronUp } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import socket from '@/lib/socket'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom'

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

type DisplayMessagesProps = {
    friend: User
    currentUser: User
    onFriendRemoved: () => void
}

export default function DisplayMessages({ friend, currentUser, onFriendRemoved }: DisplayMessagesProps) {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const [isCloseFriend, setIsCloseFriend] = useState(friend.isCloseFriend);
    const [pageNumber, setPageNumber] = useState(1)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const [isScrollLocked, setIsScrollLocked] = useState(false)
    
    const { data: initialMessages, isLoading } = useQuery({
        queryKey: ['messages', friend.id, pageNumber],
        queryFn: () => axiosInstance.post('/api/users/get-messages', { friendId: friend.id, pageNumber })
    });

    useEffect(() => {
        if (initialMessages?.data?.success) {
            setMessages(initialMessages.data.success.messages)
            markMessagesAsRead.mutate(friend.id)
        }
    }, [initialMessages, friend.id]);

    const handleLoadMore = () => {
        setIsScrollLocked(true)
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        setTimeout(() => {
            setIsScrollLocked(false)
        }, 1000)
    };

    const markMessagesAsRead = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post('/api/users/read-message', { friendId }),
        onSuccess: () => {
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.senderId === friend.id ? { ...msg, read: true } : msg
                )
            )
        },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to mark messages as read.</p>,
                variant: "destructive",
            })
        },
    });

    const removeFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post(`/api/users/remove-friend`, { friendId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] })
            toast({
                title: "Friend removed",
                description: <p className='text-neutral-300'>You've successfully removed a friend.</p>
            })
            onFriendRemoved()
        },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to remove friend. Please try again.</p>,
                variant: "destructive",
            })
        },
    });

    const handleRemoveFriend = () => {
        removeFriend.mutate(friend.id)
        window.location.reload()
    };

    const toggleCloseFriend = useMutation({
        mutationFn: (friendId: string) => axiosInstance.post("/api/users/toggle-close-friend", { friendId }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['friends'] }) },
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Error. Try refreshing the page and try again.</p>,
                variant: "destructive",
            })
        },
    });

    const handleToggleCloseFriend = () => {
        toggleCloseFriend.mutate(friend.id)
        setIsCloseFriend(!isCloseFriend)
    };

    useEffect(() => {
        if (!isScrollLocked) {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages]);


    const sendMessage = useMutation({
        mutationFn: (content: string) => axiosInstance.post(`/api/users/send-message`, { receiverId: friend.id, content }),
        onError: () => {
            toast({
                title: "Error",
                description: <p className='text-neutral-300'>Failed to send message. Please try again.</p>,
                variant: "destructive",
            })
        },
    });

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        const message: Message = {
            id: Date.now().toString(),
            content: newMessage,
            senderId: currentUser.id,
            receiverId: friend.id,
            read: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        if (newMessage.trim()) {
            setMessages(prevMessages => [...prevMessages, message]);
            setNewMessage("")
            sendMessage.mutate(newMessage)
            socket.emit("send_message", message)
        }
    };

    const handleNewMessage = useCallback((message: Message) => {
        if (message.senderId === friend.id) {
            setMessages(prevMessages => [...prevMessages, message]);
            markMessagesAsRead.mutate(friend.id);
        }
    }, [currentUser.id, friend.id]);

    useEffect(() => {
        socket.on('new_message', handleNewMessage);

        return () => {
            socket.off('new_message', handleNewMessage);
        };
    }, [handleNewMessage]);

    return (
        <div className="flex flex-col h-full rounded-lg shadow-xl overflow-hidden sm:border border-gray-700">
            <div className="sm:p-4 p-2 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <Link to={`/profile/${friend.id}`} className="flex hover:brightness-125 items-center">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={friend.profileImage} alt={friend.firstName} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{friend.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <div className="font-semibold text-lg text-primary">{`${friend.firstName} ${friend.lastName}`}</div>
                            <div className="text-sm text-gray-400">{friend.email}</div>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleToggleCloseFriend}
                            className="flex items-center"
                        >
                            <Star className={`h-6 w-6 mr-2 ${isCloseFriend ? 'text-yellow-500 fill-current' : ''}`} />
                            {isCloseFriend ? <p className='hidden sm:block'>Remove Close Friend</p> : <p className='hidden sm:block'>Add Close Friend</p>}
                        </button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex items-center"
                                >
                                    <UserMinus className="h-6 w-6 mr-2 text-neutral-300" />
                                    <p className='hidden sm:block'>Unfriend</p>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-neutral-300'>Are you absolutely sure?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='text-green-500 hover:text-green-300'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='text-red-500 hover:text-red-300' onClick={handleRemoveFriend}>
                                        Yes, unfriend
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                {isLoading && pageNumber === 1 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {initialMessages?.data.success.hasMore && (
                            <div className="flex justify-center mb-4">
                                <Button
                                    onClick={handleLoadMore}
                                    className="flex items-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary mr-2"></div>
                                    ) : (
                                        <ChevronUp className="h-4 w-4 mr-2" />
                                    )}
                                    Load More
                                </Button>
                            </div>
                        )}
                        <AnimatePresence>
                            {messages.map((message: Message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className={`mb-4 flex ${message.senderId === friend.id ? 'justify-start' : 'justify-end'}`}
                                    ref={index === messages.length - 1 ? lastMessageRef : null}
                                >
                                    <div className={`flex items-end ${message.senderId === friend.id ? 'flex-row' : 'flex-row-reverse'} sm:max-w-[50%]`}>
                                        <Avatar className="h-8 w-8 mb-2 mx-2">
                                            <AvatarImage src={message.senderId === friend.id ? friend.profileImage : currentUser.profileImage} alt={message.senderId === friend.id ? friend.firstName : currentUser.firstName} />
                                            <AvatarFallback>{message.senderId === friend.id ? friend.firstName[0] : currentUser.firstName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col max-w-sm">
                                            <div
                                                className={`p-3 rounded-lg ${message.senderId === friend.id
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'bg-primary text-primary-foreground'
                                                    } shadow-md break-words`}
                                            >
                                                {message.content}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                                                {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                                                {message.senderId !== friend.id && message.read && (
                                                    <Check className="h-3 w-3 text-green-500 ml-1" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </>
                )}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 mr-2"
                    />
                    <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}