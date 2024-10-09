import { useState, Dispatch, SetStateAction } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstance"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface DeleteUserButtonProps {
    setIsDeletingAccount: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteUserButton({ setIsDeletingAccount }: DeleteUserButtonProps) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [password, setPassword] = useState("")
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const deleteUser = useMutation({
        mutationFn: (password: string) => axiosInstance.post("/api/users/delete-user", { password }),
        onMutate: () => setIsDeletingAccount(true),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
            toast({
                title: "Success",
                description: "Your account has been deleted.",
            })
            localStorage.removeItem("token")
            navigate("/")
        },
        onError: (error:any) => {
            console.log(error.response.data.error)
            toast({
                title: "Error",
                description: `${error.response.data.error}`,
            })
        },
        onSettled: () => setIsDeletingAccount(false)
    })

    const handleDelete = () => {
        deleteUser.mutate(password)
        setIsOpen(false)
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-background border-neutral-800 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-300">
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Enter your password to confirm</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-neutral-800 text-white border-neutral-700"
                        />
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-neutral-800 text-white hover:bg-neutral-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={!password || deleteUser.isPending}
                        className={cn(
                            "bg-red-600 text-white hover:bg-red-700",
                            (!password || deleteUser.isPending) && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {deleteUser.isPending ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}