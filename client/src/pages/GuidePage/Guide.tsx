import { animateSlide } from '@/animations/AnimateSlide'
import { animateSlideWhenScrolling } from '@/animations/AnimateSlideWhenScrolling'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

function Guide() {
    const animateLeftProps = {
        xHidden: -100,
        xVisible: 0,
        duration: 0.5,
        delay: 0
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
            <motion.h1
                variants={animateSlide({
                    yHidden: -70,
                    delay: 0.2,
                    duration: 0.7
                })}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-5xl font-bold text-center mb-12"
            >
                Beginner's Guide to Contributing
            </motion.h1>

            <Tabs defaultValue="submitting" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-4">
                    <TabsTrigger value="submitting" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Submitting Work</TabsTrigger>
                    <TabsTrigger value="configurations" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Local Configs</TabsTrigger>
                    <TabsTrigger value="styling" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Styling Rules</TabsTrigger>
                    <TabsTrigger value="adding" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Adding Your Page</TabsTrigger>
                    <TabsTrigger value="server" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Server Guidelines</TabsTrigger>
                    <TabsTrigger value="best-practices" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Best Practices</TabsTrigger>
                </TabsList>
                <ScrollArea className="min-h-[60vh] w-full border-y sm:py-4 sm:px-4">
                    <TabsContent value="submitting">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Submitting Your Work</CardTitle>
                                <CardDescription>Steps to contribute your code to the project</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li><span className='font-semibold'>1. Create a New Branch:</span> Use <code>git checkout -b your-branch-name</code> to create a unique branch for your work.</li>
                                    <li><span className='font-semibold'>2. Finish and Test Your Page:</span> Ensure your page is complete and thoroughly tested before submission.</li>
                                    <li><span className='font-semibold'>3. Submit a Pull Request:</span> Use <code>git push origin your-branch-name</code> and create a new pull request on the repository.</li>
                                    <li><span className='font-semibold'>4. Code Review:</span> Wait for a review of your code. Be prepared to make changes if requested.</li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="configurations">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Configurations for Local Development</CardTitle>
                                <CardDescription>Adjusting settings for local work</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li>
                                        <span className='font-semibold'>Configure Axios:</span>
                                        <p>In <code>/client/lib/axiosinstance.tsx</code>, comment out production config and activate local development.</p>
                                        <img src='https://i.gyazo.com/f313c7904284fad48d8272987c484907.png' alt='Axios Configuration Example' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Configure Prisma:</span>
                                        <p>In <code>/server/prisma/Prisma.js</code>, comment out production config and activate local development.</p>
                                        <img src='https://i.gyazo.com/20b85e44be57cc8824d3fd106c179518.png' alt='Prisma Configuration Example' className='w-full max-w-md mt-2' />
                                    </li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="styling">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Styling Rules for Your Page</CardTitle>
                                <CardDescription>Guidelines for consistent and responsive design</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li>
                                        <span className='font-semibold'>Responsiveness:</span>
                                        <p>Use Flexbox and Grid layout utilities. Focus on centering and spacing with classes like <code>flex</code>, <code>grid</code>, <code>justify-center</code>, etc.</p>
                                        <img src='https://i.gyazo.com/2c0234652bb4108b40469834f5f5226f.png' alt='Responsive Design Example' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Using Animations:</span>
                                        <p>Use <code>AnimateSlide.tsx</code> for initial load animations and <code>AnimateSlideWhenScrolling.tsx</code> for scroll-triggered animations.</p>
                                        <img src='https://i.gyazo.com/b356efd5f0c70e08a7b4631b2aaa27cc.png' alt='AnimateSlide Configuration' className='w-full max-w-md mt-2' />
                                        <img src='https://i.gyazo.com/57de61530ec1f7192e86bb59132f57c3.png' alt='AnimateSlideWhenScrolling Configuration' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Using Shadcn Components:</span>
                                        <p>Utilize Shadcn components from <code>/client/components/ui/</code> for consistent styling.</p>
                                    </li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="adding">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Adding Your Page to the App</CardTitle>
                                <CardDescription>Steps to make your page accessible and searchable</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li>
                                        <span className='font-semibold'>Add to List of Pages:</span>
                                        <p>In <code>@lib/ListOfPages.tsx</code>, add your page: <code>{`{ name: 'Your Page Name', path: '/your-page-path' }`}</code></p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Add to Routes:</span>
                                        <p>In <code>app.tsx</code>, add your route: <code>{`<Route path="/your-page-path" element={<YourPageComponent />} />`}</code></p>
                                    </li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="server">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Server-Side Guidelines</CardTitle>
                                <CardDescription>Steps to add new routes and ensure security</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li>
                                        <span className='font-semibold'>Create a Controller Function:</span>
                                        <p>Define your function in the appropriate controller in <code>/server/src/controllers</code>.</p>
                                        <img src='https://i.gyazo.com/54dd4f7bffaadf0faf922748ebabf4dc.png' alt='Controller Function Example' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Add Your Route:</span>
                                        <p>Define your route in <code>/server/src/routes</code> and map it to your controller function.</p>
                                        <img src='https://i.gyazo.com/b61d5fede69af81fc4914010715ac28d.png' alt='Route Example' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Apply Middleware:</span>
                                        <p>Use the <code>verifyToken</code> middleware for routes that require user authentication.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Register Your Route:</span>
                                        <p>Add your new route in <code>/server/src/app.js</code>.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Frontend Integration:</span>
                                        <p>Use <code>axiosInstance</code> with <code>tanstack/react-query</code> to interact with your new route.</p>
                                        <img src='https://i.gyazo.com/14cbdc63ebf0f91a0d9718c3fabef462.png' alt='Frontend Integration Example' className='w-full max-w-md mt-2' />
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Ensure Data Security:</span>
                                        <p>Extract sensitive information before sending data to the client.</p>
                                        <img src='https://i.gyazo.com/3f0b6861f052aad0dfc0fc1b3acd403d.png' alt='Data Security Example' className='w-full max-w-md mt-2' />
                                    </li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="best-practices">
                        <Card className="border-0 shadow-none">
                            <CardHeader>
                                <CardTitle>Best Practices</CardTitle>
                                <CardDescription>Guidelines for writing clean, efficient, and maintainable code</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <motion.ul
                                    className='space-y-4'
                                    variants={animateSlideWhenScrolling(animateLeftProps)}
                                    initial='hidden'
                                    whileInView='visible'
                                >
                                    <li>
                                        <span className='font-semibold'>Code Consistency:</span>
                                        <p>Follow the existing code style and formatting. Use ESLint and Prettier to maintain consistency.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Component Structure:</span>
                                        <p>Keep components small and focused. Extract reusable logic into custom hooks.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>State Management:</span>
                                        <p>Use React Query for server state and React Context or Zustand for complex client state.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Performance Optimization:</span>
                                        <p>Implement lazy loading, memoization, and virtualization for large lists when necessary.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Error Handling:</span>
                                        <p>Implement proper error boundaries and provide meaningful error messages to users.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Accessibility:</span>
                                        <p>Ensure your components are accessible. Use semantic HTML and ARIA attributes where necessary.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Testing:</span>
                                        <p>Write unit tests for your components and integration tests for critical user flows.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Documentation:</span>
                                        <p>Document complex logic and add comments to explain non-obvious code. Use JSDoc for function documentation.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Security:</span>
                                        <p>Never expose sensitive information. Always validate and sanitize user inputs.</p>
                                    </li>
                                    <li>
                                        <span className='font-semibold'>Code Reviews:</span>
                                        <p>Participate actively in code reviews. Be open to feedback and provide constructive comments to others.</p>
                                    </li>
                                </motion.ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    )
}

export default Guide