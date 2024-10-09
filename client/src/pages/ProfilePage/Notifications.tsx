import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, MessageSquare, UserPlus, AlertTriangle, UserCheck, UserMinus, ChevronRight, Check, Loader2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'
import { useQueryClient, useMutation } from '@tanstack/react-query'

interface Notification {
    id: string
    type: string
    content: string
    createdAt: string
    read: boolean
    linkUrl: string
}

interface NotificationsProps {
    notifications: Notification[]
    unreadCount: number
}

export default function Notifications({ notifications, unreadCount }: NotificationsProps) {
    const [localNotifications, setLocalNotifications] = useState(notifications)
    const queryClient = useQueryClient()
    const [loadingNotificationId, setLoadingNotificationId] = useState<string | null>(null)

    const markAsReadMutation = useMutation({
        mutationFn: (notificationId: string) =>
            axiosInstance.post('/api/users/mark-notifications-as-read', { notificationId }),
        onMutate: (notificationId) => {
            setLoadingNotificationId(notificationId)
        },
        onSuccess: (_, notificationId) => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
            setLocalNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, read: true } : notif
                )
            )
        },
        onError: (error) => {
            console.error('Failed to mark notification as read:', error)
        },
        onSettled: () => {
            setLoadingNotificationId(null)
        }
    })

    const markAllAsReadMutation = useMutation({
        mutationFn: () => axiosInstance.post('/api/users/mark-all-notifications-as-read'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] })
            setLocalNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
        },
        onError: (error) => {
            console.error('Failed to mark all notifications as read:', error)
        }
    })

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'NEW_MESSAGE':
                return <MessageSquare className="h-5 w-5 text-blue-500" />
            case 'FRIEND_REMOVED':
                return <UserPlus className="h-5 w-5 text-red-500" />
            case 'NEW_FRIEND':
                return <UserPlus className="h-5 w-5 text-green-500" />
            case 'ALERT':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />
            case 'NEW_CLOSE_FRIEND':
                return <UserCheck className="h-5 w-5 text-purple-500" />
            case 'REMOVED_CLOSE_FRIEND':
                return <UserMinus className="h-5 w-5 text-red-500" />
            default:
                return <Bell className="h-5 w-5 text-gray-500" />
        }
    }

    const NotificationContent = ({ notification }: { notification: Notification }) => (
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1">
                <p className="font-semibold text-sm truncate">{notification.type}</p>
                {!notification.read && (
                    <Badge variant="secondary" className="text-xs">New</Badge>
                )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.content}</p>
            <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
            </p>
        </div>
    )

    return (
        <Card className="shadow-lg rounded-xl border-neutral-800">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                        <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                        Notifications
                    </CardTitle>
                    {unreadCount > 0 && (
                        <div className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-sm px-2 py-1">
                                {unreadCount} New
                            </Badge>
                            <Button
                                variant="link"
                                size="sm"
                                onClick={() => markAllAsReadMutation.mutate()}
                                disabled={markAllAsReadMutation.isPending}
                            >
                                {markAllAsReadMutation.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : null}
                                Mark All as Read
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                        {localNotifications.length > 0 ? (
                            localNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 relative border rounded-xl transition-all duration-200 ${notification.read ? 'border-neutral-900' : 'border-neutral-500'}`}
                                >
                                    <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                                        <div className="flex-shrink-0">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <NotificationContent notification={notification} />
                                        <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => markAsReadMutation.mutate(notification.id)}
                                                disabled={notification.read || markAsReadMutation.isPending}
                                                className="px-2 py-1 w-full sm:w-auto"
                                            >
                                                {loadingNotificationId === notification.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : notification.read ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <span className="text-xs">Mark as Read</span>
                                                )}
                                            </Button>
                                            <Link to={notification.linkUrl} className="sm:mt-2">
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No notifications yet.</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}