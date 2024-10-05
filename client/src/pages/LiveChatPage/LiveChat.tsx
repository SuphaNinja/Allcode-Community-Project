import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Sidebar from './Sidebar'
import DisplayMessages from './DisplayMessages'

type Friend = {
    id: string
    firstName: string
    lastName: string
    userName: string
    email: string
    profileImage?: string
}

export default function LiveChat({ currentUser }: any) {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleFriendSelect = (friend: Friend) => {
        setSelectedFriend(friend)
        setIsMobileMenuOpen(false) 
    }

    return (
        <div className="flex sm:flex-row flex-col h-screen overflow-hidden">
            {/* Mobile menu button */}
            <div className="sm:hidden z-50 m-4">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="p-0 w-9 h-9">
                            <Menu className="h-5 w-5 text-neutral-300" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[80%] sm:w-[385px] p-0">
                        <div className="p-4 font-semibold text-neutral-300 border-b border-neutral-600">Friends</div>
                        <Sidebar onFriendSelect={handleFriendSelect} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Friend list sidebar (hidden on mobile) */}
            <div className="hidden sm:block w-80 border-r border-neutral-600">
                <Sidebar onFriendSelect={handleFriendSelect} />
            </div>

            {/* Message display area */}
            <div className="flex-1 overflow-hidden">
                {selectedFriend ? (
                    <div className="h-full flex flex-col">
                        {/* Messages */}
                        <div className="flex-1 overflow-hidden">
                            <DisplayMessages
                                friend={selectedFriend}
                                currentUser={currentUser.data.data.success}
                                onFriendRemoved={() => setSelectedFriend(null)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='sm:hidden'>
                        <Sidebar onFriendSelect={handleFriendSelect} />
                    </div>
                        
                  
                )}
            </div>
        </div>
    )
}