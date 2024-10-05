import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import { Bell } from 'lucide-react'

const schema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters').max(15, 'First name must be at most 15 characters'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters').max(15, 'Last name must be at most 15 characters'),
    profileImage: z.string().url('Invalid URL').optional().or(z.literal('')),
    role: z.enum(['admin', 'builder', 'founder']).optional(),
    roleCode: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface User {
    firstName: string
    lastName: string
    profileImage?: string
    role?: string
}

interface AccountInfoProps {
    currentUser: User
}

export default function AccountInfo({ currentUser }: AccountInfoProps) {
    const [latestUserData, setLatestUserData] = useState<User>(currentUser)
    const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, setValue, watch, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: latestUserData.firstName,
            lastName: latestUserData.lastName,
            profileImage: latestUserData.profileImage || '',
            role: latestUserData.role as FormData['role'],
        },
    })

    const [role, setRole] = useState<string | undefined>(latestUserData.role)
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const watchRoleCode = watch('roleCode')

    useEffect(() => {
        setLatestUserData(currentUser)
        reset({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            profileImage: currentUser.profileImage || '',
            role: currentUser.role as FormData['role'],
        })
        setRole(currentUser.role)
    }, [currentUser, reset])

    const updateProfileMutation = useMutation({
        mutationFn: (data: Partial<FormData>) =>
            axiosInstance.post('/api/users/update-user-profile', data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            setLatestUserData(prevState => ({ ...prevState, ...data.data.user }))
            reset({
                firstName: data.data.user.firstName,
                lastName: data.data.user.lastName,
                profileImage: data.data.user.profileImage || '',
                role: data.data.user.role as FormData['role'],
            })
            setRole(data.data.user.role)
            const { dismiss } = toast({
                description: (
                    <div className="flex flex-col items-start space-y-3">
                        <div className="flex items-center space-x-2">
                            <Bell className="h-5 w-5 text-blue-500" />
                            <span className="font-semibold text-neutral-100">Profile Updated</span>
                        </div>
                        <p className="text-sm text-neutral-300">{data.data.message}</p>
                    </div>
                ),
                className: "border border-neutral-800 rounded-xl shadow-lg",
                duration: 5000,
                action: (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dismiss()}
                        className="mt-2 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 border-neutral-700"
                    >
                        Dismiss
                    </Button>
                ),
            })
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.response?.data?.error || "An error occurred while updating the profile",
                variant: "destructive",
            })
        },
    })

    const onSubmit = (data: FormData) => {
        const updatedData: Partial<FormData> = {}

        if (data.firstName !== latestUserData.firstName) updatedData.firstName = data.firstName
        if (data.lastName !== latestUserData.lastName) updatedData.lastName = data.lastName
        if (data.profileImage !== latestUserData.profileImage) updatedData.profileImage = data.profileImage
        if (data.role !== latestUserData.role) {
            updatedData.role = data.role
            updatedData.roleCode = data.roleCode
        }

        if (Object.keys(updatedData).length > 0) {
            updateProfileMutation.mutate(updatedData)
        }
    }

    const isButtonDisabled = () => {
        if (updateProfileMutation.isPending) return true
        if (role !== latestUserData.role && (!dirtyFields.roleCode || !watchRoleCode)) return true
        return !isDirty
    }

    return (
        <Card className="shadow-lg rounded-2xl border-neutral-800">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                className="rounded-xl border-neutral-800 hover:border-neutral-700 focus:border-neutral-600"
                            />
                            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                className="rounded-xl border-neutral-800 hover:border-neutral-700 focus:border-neutral-600"
                            />
                            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="profileImage" className="text-foreground">Profile Image URL (Optional)</Label>
                        <Input
                            id="profileImage"
                            {...register('profileImage')}
                            className="rounded-xl border-neutral-800 hover:border-neutral-700 focus:border-neutral-600"
                        />
                        {errors.profileImage && <p className="text-sm text-red-500 mt-1">{errors.profileImage.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-foreground">Role (Optional)</Label>
                        <Select
                            onValueChange={(value) => {
                                setRole(value)
                                setValue('role', value as FormData['role'], { shouldDirty: true })
                            }}
                            value={role}
                        >
                            <SelectTrigger className="w-full rounded-xl border border-neutral-800 bg-transparent text-neutral-300 hover:border-neutral-700 focus:border-neutral-600 focus:ring-neutral-600">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border border-neutral-800  shadow-lg">
                                <SelectItem
                                    className="text-neutral-400 rounded-xl hover:text-neutral-100 focus:text-neutral-100 focus:bg-neutral-800 cursor-pointer transition-colors duration-150"
                                    value="admin"
                                >
                                    Admin
                                </SelectItem>
                                <SelectItem
                                    className="text-neutral-400 rounded-xl hover:text-neutral-100 focus:text-neutral-100 focus:bg-neutral-800 cursor-pointer transition-colors duration-150"
                                    value="builder"
                                >
                                    Builder
                                </SelectItem>
                                <SelectItem
                                    className="text-neutral-400 rounded-xl hover:text-neutral-100 focus:text-neutral-100 focus:bg-neutral-800 cursor-pointer transition-colors duration-150"
                                    value="founder"
                                >
                                    Founder
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {role && role !== latestUserData.role && (
                        <div className="space-y-2">
                            <Label htmlFor="roleCode" className="text-foreground">Role Code</Label>
                            <Input
                                id="roleCode"
                                {...register('roleCode')}
                                type="password"
                                className="rounded-xl border-neutral-800 hover:border-neutral-700 focus:border-neutral-600"
                            />
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full rounded-xl"
                        disabled={isButtonDisabled()}
                    >
                        {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}