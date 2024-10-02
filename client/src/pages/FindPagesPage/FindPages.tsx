import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, TrendingUpIcon, SearchIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { ListOfPages } from '@/lib/ListOfPages'

interface Page {
    name: string
    shortDescription: string
    description: string
    path: string
    trending: boolean
    createdBy: string
    createdAt: Date
    image: string
}

export default function Pages() {
    const [sortedPages, setSortedPages] = useState<Page[]>([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const sorted = [...ListOfPages].sort((a, b) => {
            if (a.trending && !b.trending) return -1
            if (!a.trending && b.trending) return 1
            return 0
        })
        setSortedPages(sorted)
    }, [])

    const filteredPages = sortedPages.filter(page =>
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold mb-12 text-center text-primary">Explore Our Pages</h1>
            <div className="mb-12 max-w-2xl mx-auto">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        type="text"
                        placeholder="Search pages or creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-lg"
                    />
                </div>
            </div>
            <AnimatePresence>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {filteredPages.map((page, index) => (
                        <motion.div
                            key={page.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={page.image}
                                        alt={`Preview of ${page.name}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                    {page.trending && (
                                        <Badge variant="secondary" className="absolute top-4 right-4 flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
                                            <TrendingUpIcon className="h-4 w-4" />
                                            Trending
                                        </Badge>
                                    )}
                                </div>
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-3xl font-bold text-primary">{page.name}</CardTitle>
                                    <CardDescription className="text-lg text-muted-foreground mt-2">{page.shortDescription}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-base text-card-foreground line-clamp-4">{page.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center bg-muted p-6">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${page.createdBy}`} />
                                            <AvatarFallback>{page.createdBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-card-foreground">{page.createdBy}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        {format(page.createdAt, 'MMM d, yyyy')}
                                    </div>
                                </CardFooter>
                                <Link
                                    to={page.path}
                                    className="block w-full hover:underline text-center py-4 px-6 bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
                                >
                                    Explore Page
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            {filteredPages.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xl text-muted-foreground mt-12"
                >
                    No pages found matching your search.
                </motion.p>
            )}
        </div>
    )
}