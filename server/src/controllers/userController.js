import prisma from "../../prisma/Prisma.js";
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import bcrypt from 'bcrypt';

import { sendEmailConfirmation } from "../EmailAssets/sendEmails.js"
import jwt from "jsonwebtoken";
import { sendNotification } from "../socketServer.js";
import { reverse } from "dns";

export async function createUser(req, res) {
    const signUpData = req.body;
    const token = randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    try {
        const createdUser = await prisma.user.create({
            data: {
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                userName: signUpData.userName,
                email: signUpData.email,
                password: hashedPassword,
                emailConfirmationToken: hashedToken,
                emailConfirmationExpiresAt: addHours(new Date(), 2),
            },
        });

        await sendEmailConfirmation(createdUser.email, createdUser.firstName, createdUser.lastName, createdUser.userName, token);
        res.status(200).send({ success: ""})
    } catch (error) { return res.status(500).send({ error: 'User creation failed' })};
};

export async function login(req, res) {
    const loginData = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {OR: [{ userName: loginData.username },{ email: loginData.email }]}
        });
        if (!user) { return res.status(404).send({ error: "Could not find user." }) };

        const isPassMatch = bcrypt.compare(loginData.password, user.password);
        if (!isPassMatch) { return res.status(400).send({ error: "Password or email is incorrect." }) };

        res.status(200).send({
            success: 'User logged in successfully',
            token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "4h" }),
        });

    } catch (error) {return res.status(500).send({ error: "Something went wrong when trying to verify your email, please try again later." })};
};

export async function updateUserProfile(req, res) {
    const userId = req.userId;
    const { firstName, lastName, profileImage, role, roleCode } = req.body;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prepare update data
        const updateData = {
            firstName: firstName || existingUser.firstName,
            lastName: lastName || existingUser.lastName,
            profileImage: profileImage || existingUser.profileImage,
            updatedAt: new Date()
        };

        let roleUpdateMessage = '';

        // Handle role update
        if (role) {
            switch (role) {
                case "admin":
                    if (roleCode === process.env.ADMIN_KEY) {
                        updateData.role = role;
                    } else {
                        roleUpdateMessage = 'Invalid admin key provided. Role not updated.';
                    }
                    break;
                case "builder":
                    if (roleCode === process.env.BUILDER_KEY) {
                        updateData.role = role;
                    } else {
                        roleUpdateMessage = 'Invalid builder key provided. Role not updated.';
                    }
                    break;
                case "founder":
                    if (roleCode === process.env.FOUNDER_KEY) {
                        updateData.role = role;
                    } else {
                        roleUpdateMessage = 'Invalid founder key provided. Role not updated.';
                    }
                    break;
                default:
                    roleUpdateMessage = 'Invalid role specified. Role not updated.';
            }
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                role: true,
                updatedAt: true
            }
        });

        const responseMessage = roleUpdateMessage
            ? `User profile updated successfully. ${roleUpdateMessage}`
            : 'User profile updated successfully';

        res.status(200).json({
            success: true,
            message: responseMessage,
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'An error occurred while updating the user profile' });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            include: {
                friendshipsInitiated: true,
                friendshipsReceived: true,
                messagesSent: true,
                messagesReceived: true,
                notificationsSent: true,
                notificationsReceived: true
            }
        });
        if (!users || users.length === 0) {return res.status(404).send({ error: "Users could not be found!" })};

        const usersWithoutPass = users.map(({ password, ...rest }) => rest);

        res.status(200).send({ success: usersWithoutPass });

    } catch (error) {return res.status(500).send({ error: "Something went wrong, please try again later." })};
};

export async function getCurrentUser(req, res) {
    const userId = req.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                friendshipsInitiated: true,
                friendshipsReceived: true,
                messagesSent: true,
                messagesReceived: true,
                notificationsSent: true,
                notificationsReceived: true
            }
        });
        if (!user) { return res.status(404).send({ error: "User could not be found!" }) };

        const { password, ...userWithoutPass } = user;
        res.status(200).send({ success: userWithoutPass });

    } catch (error) {return res.status(500).send({ error: "Something went wrong, please try again later." })};
};

export async function getUserById(req, res) {
    const currentUserId = req.userId;
    const { userId } = req.body;

    if (!userId) {return res.status(400).send({ error: "User ID is required" })};

    try {
        const userSelect = {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            profileImage: true,
        };

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                friendshipsInitiated: {
                    include: {friend: { select: userSelect }}
                },
                friendshipsReceived: {
                    include: {user: { select: userSelect }}
                },
                notificationsReceived: {
                    where: { receiverId: currentUserId }
                },
            },
        });
        if (!user) {return res.status(404).send({ error: "User could not be found!" })};

        const friends = [
            ...user.friendshipsInitiated.map(f => ({
                ...f.friend,
                isCloseFriend: f.isCloseFriend
            })),
            ...user.friendshipsReceived.map(f => ({
                ...f.user,
                isCloseFriend: f.isCloseFriend
            }))
        ];

        const {
            password,
            emailConfirmationToken,
            emailConfirmationExpiresAt,
            resetPasswordToken,
            resetPasswordExpiresAt,
            friendshipsInitiated,
            friendshipsReceived,
            ...safeUser
        } = user;

        const userWithFriends = { ...safeUser, friends: friends };

        res.status(200).send({ success: userWithFriends });

    } catch (error) {return res.status(500).send({ error: "Something went wrong, please try again later." })};
};

export async function addFriend(req, res) {
    const userId = req.userId
    const { friendId } = req.body

    if (!friendId) { return res.status(400).send({ error: "friendId is required" })};

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { firstName: true, lastName: true }
        })
        if (!user) { return res.status(404).send({ error: "User not found" })};

        const existingFriendship = await prisma.friendship.findFirst({
            where: { OR: [{ userId, friendId }, { userId: friendId, friendId: userId }] }
        });
        if (existingFriendship) { return res.status(400).send({ error: "Friendship already exists" })};

        const newFriendship = await prisma.friendship.create({
            data: { userId, friendId }
        });

        const notificationContent = `${user.firstName} ${user.lastName} has added you as a friend.`
        const notificationTitle = `New Friend: ${user.firstName} ${user.lastName}`

        await prisma.notification.create({
            data: {
                type: 'NEW_FRIEND',
                content: notificationContent,
                senderId: userId,
                receiverId: friendId,
                linkUrl: `/profile/${userId}`,
            }
        })

        sendNotification(friendId, {
            type: 'NEW_FRIEND',
            title: notificationTitle,
            content: notificationContent,
            linkUrl: `/profile/${userId}`,
            senderId: userId
        })

        res.status(201).send({ success: newFriendship });

    } catch (error) {return res.status(500).send({ error: "An error occurred while adding friend" })};
};

export async function removeFriend(req, res) {
    const userId = req.userId
    const { friendId } = req.body

    if (!friendId) { return res.status(400).send({ error: "friendId is required" }) };

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { firstName: true, lastName: true }
        })
        if (!user) { return res.status(404).send({ error: "User not found" }) };

        const friendship = await prisma.friendship.findFirst({
            where: { OR: [{ userId, friendId }, { userId: friendId, friendId: userId }] }
        });
        if (!friendship) { return res.status(404).send({ error: "Friendship not found" }) };

        await prisma.friendship.delete({
            where: { id: friendship.id }
        })

        const notificationContent = `${user.firstName} ${user.lastName} has removed you from their friends list.`;
        const notificationTitle = `Friend Removed: ${user.firstName} ${user.lastName}`;

        await prisma.notification.create({
            data: {
                type: 'FRIEND_REMOVED',
                content: notificationContent,
                senderId: userId,
                receiverId: friendId,
                linkUrl: `/profile/${userId}`,
            }
        });

        sendNotification(friendId, {
            type: 'FRIEND_REMOVED',
            title: notificationTitle,
            content: notificationContent,
            linkUrl: `/profile/${userId}`,
            senderId: userId
        });

        res.status(200).send({ success: "Friend removed successfully" });

    } catch (error) { return res.status(500).send({ error: "An error occurred while removing friend" }) };
};

export async function toggleCloseFriend(req, res) {
    const userId = req.userId;
    const { friendId } = req.body;

    if (!friendId) {return res.status(400).send({ error: "friendId is required" })};

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { firstName: true, lastName: true }
        });
        if (!user) { return res.status(404).send({ error: "User not found" })};

        const friendship = await prisma.friendship.findFirst({
            where: { OR: [{ userId: userId, friendId: friendId }, { userId: friendId, friendId: userId }]
            }
        });
        if (!friendship) {return res.status(404).send({ error: "Friendship not found" })};

        const updatedFriendship = await prisma.friendship.update({
            where: { id: friendship.id },
            data: { isCloseFriend: !friendship.isCloseFriend }
        });

        let notificationContent, notificationTitle;
        if (updatedFriendship.isCloseFriend) {
            notificationContent = `${user.firstName} ${user.lastName} marked your friendship as close!`;
            notificationTitle = `New Close Friend: ${user.firstName} ${user.lastName}`;
        } else {
            notificationContent = `${user.firstName} ${user.lastName} removed the close friend status from your friendship.`;
            notificationTitle = `Close Friend Status Removed: ${user.firstName} ${user.lastName}`;
        };

        await prisma.notification.create({
            data: {
                type: updatedFriendship.isCloseFriend ? 'NEW_CLOSE_FRIEND' : 'REMOVED_CLOSE_FRIEND',
                content: notificationContent,
                senderId: userId,
                receiverId: friendId,
                linkUrl: "/livechat"
            }
        });

        sendNotification(friendId, {
            type: updatedFriendship.isCloseFriend ? 'NEW_CLOSE_FRIEND' : 'REMOVED_CLOSE_FRIEND',
            title: notificationTitle,
            content: notificationContent,
            linkUrl: "/livechat",
            senderId: userId
        });

        res.status(200).send({
            success: {
                isCloseFriend: updatedFriendship.isCloseFriend,
                message: updatedFriendship.isCloseFriend ? "Marked as close friend" : "Removed close friend status"
            }
        });

    } catch (error) {return res.status(500).send({ error: "An error occurred while updating close friend status" })};
};

export async function getFriends(req, res) {
    const userId = req.userId;

    try {
        const friendships = await prisma.friendship.findMany({
            where: { OR: [{ userId: userId }, { friendId: userId }]},
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, email: true, profileImage: true}
                },
                friend: {
                    select: { id: true, firstName: true, lastName: true, email: true, profileImage: true }
                }
            }
        });

        const friends = friendships.map(friendship => friendship.userId === userId ? friendship.friend : friendship.user);

        res.status(200).send({ success: friends });

    } catch (error) {return res.status(500).send({ error: "An error occurred while fetching friends" })};
};

export async function sendMessage(req, res) {
    const senderId = req.userId
    const { receiverId, content } = req.body

    if (!receiverId || !content) { return res.status(400).send({ error: "receiverId and content are required" })};

    try {
        const newMessage = await prisma.message.create({
            data: { content, senderId, receiverId,}
        });

        const sender = await prisma.user.findUnique({
            where: { id: senderId }
        })

        await prisma.notification.create({
            data: {
                type: 'NEW_MESSAGE',
                content: `You have a new message from ${sender.firstName} ${sender.lastName}!`,
                senderId: senderId,
                receiverId: receiverId,
                linkUrl: "/livechat"
            }
        });

        sendNotification(receiverId, {
            type: 'NEW_MESSAGE',
            Title: `New message from ${sender.firstName} ${sender.lastName}`,
            content: 'You have a new message',
            linkUrl: "/livechat",
            senderId: senderId
        });

        res.status(201).send({ success: newMessage })
    } catch (error) {return res.status(500).send({ error: "An error occurred while sending the message" })};
};

export async function getMessages(req, res) {
    const userId = req.userId;
    const { friendId, pageNumber = 1 } = req.body;
    const pageSize = 20;

    if (!friendId) {
        return res.status(400).json({ error: "friendId is required in the request body" });
    }

    try {
        let messages;
        let totalCount;

        if (pageNumber === 0) {
            // Fetch all messages
            messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId, receiverId: friendId },
                        { senderId: friendId, receiverId: userId }
                    ]
                },
                orderBy: { createdAt: 'desc' }
            });
            totalCount = messages.length;
        } else {
            // Fetch paginated messages
            totalCount = await prisma.message.count({
                where: {
                    OR: [
                        { senderId: userId, receiverId: friendId },
                        { senderId: friendId, receiverId: userId }
                    ]
                }
            });

            messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId, receiverId: friendId },
                        { senderId: friendId, receiverId: userId }
                    ]
                },
                orderBy: { createdAt: 'desc' },
                take: pageNumber * pageSize
            });
        }

        const hasMore = totalCount > messages.length;

        res.status(200).json({
            success: {
                messages: messages.reverse(),
                hasMore,
                totalCount
            }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: "An error occurred while fetching messages" });
    }
}

export async function getFriendsWithLastMessage(req, res) {
    const userId = req.userId
    try {
        const friendships = await prisma.friendship.findMany({
            where: { OR: [{ userId: userId }, { friendId: userId }]},
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, userName: true, email: true, profileImage: true}
                },
                friend: {
                    select: { id: true, firstName: true, lastName: true, userName: true, email: true, profileImage: true }
                }
            }
        });
        if (!friendships || friendships.length === 0) { return res.status(404).send({ error: "No friends found." })};

        const friendsWithLastMessage = await Promise.all(
            friendships.map(async (friendship) => {
                const friend = friendship.userId === userId ? friendship.friend : friendship.user;

                const lastMessage = await prisma.message.findFirst({
                    where: { OR: [{ senderId: userId, receiverId: friend.id }, { senderId: friend.id, receiverId: userId }],
                    },
                    orderBy: { createdAt: 'desc' },
                    select: { content: true, createdAt: true },
                });

                const unreadCount = await prisma.message.count({
                    where: { senderId: friend.id, receiverId: userId, read: false },
                });

                return {...friend, lastMessage, unreadCount, isCloseFriend: friendship.isCloseFriend };
            })
        );

        // Sort friends: close friends first, then by last message date
        const sortedFriends = friendsWithLastMessage.sort((a, b) => {
            if (a.isCloseFriend && !b.isCloseFriend) return -1;
            if (!a.isCloseFriend && b.isCloseFriend) return 1;

            const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
            const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
            return dateB.getTime() - dateA.getTime();
        });

        res.status(200).send({ success: sortedFriends });

    } catch (error) {return res.status(500).send({ error: 'Internal server error' })};
};

// Mark messages as read
export async function markMessagesAsRead(req, res) {
    const userId = req.userId;
    const  {friendId} = req.body;

    try {
        await prisma.message.updateMany({
            where: { senderId: friendId, receiverId: userId, read: false},
            data: { read: true }
        });

        res.status(200).json({ success: "Messages marked as read" });

    } catch (error) {return res.status(500).send({ error: "An error occurred while marking messages as read" })};
};

// Get notifications for the current user
export async function getNotifications(req, res) {
    const userId = req.userId

    try {
        const notifications = await prisma.notification.findMany({
            where: { receiverId: userId },
            orderBy: [{ read: 'asc' }, { createdAt: 'desc' }]
        });

        res.status(200).send({ success: notifications });

    } catch (error) {return res.status(500).send({ success: false, error: "An error occurred while fetching notifications" })};
};

// Mark a notification as read
export async function markNotificationAsRead(req, res) {
    const userId = req.userId
    const { notificationId } = req.body;

    try {
        const updatedNotification = await prisma.notification.updateMany({
            where: { id: notificationId,receiverId: userId},
            data: { read: true }
        });

        if (updatedNotification.count === 0) { return res.status(404).send({ error: "Notification not found" })};

        res.status(200).send({ success: "Notification marked as read" });

    } catch (error) {return res.status(500).send({ error: "An error occurred while marking the notification as read" })};
}

export const markAllNotificationsAsRead = async (req, res) => {
    const userId = req.userId;
    if (!userId) { return res.status(401).send({ error: 'Unauthorized' })};

    try {
        const updatedNotifications = await prisma.notification.updateMany({
            where: {receiverId: userId, read: false},  
            data: { read: true }
        })

        res.status(200).send({
            success: true,
            message: 'All notifications marked as read',
            updatedCount: updatedNotifications.count
        });

    } catch (error) {return res.status(500).send({ error: 'Failed to mark all notifications as read' })};
};