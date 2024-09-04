import { animateSlide } from '@/animations/AnimateSlide'
import { animateSlideWhenScrolling } from '@/animations/AnimateSlideWhenScrolling'
import { motion } from 'framer-motion'
import HomeFooter from '../HomePage/HomeFooter';

function Guide() {
    const animateRightProps = {
        xHidden: 100,
        xVisible: 0,
        duration: 0.5,
        delay: 0
    };

    const animateLeftProps = {
        xHidden: -100,
        xVisible: 0,
        duration: 0.5,
        delay: 0
    };

    return (
        <div className="flex flex-col justify-center items-center border-b border-neutral-900 py-12 md:py-24">
            <div className="flex flex-col max-w-2xl gap-12 md:gap-16">
                <motion.h3
                    variants={animateSlide({
                        yHidden: -70,
                        delay: 0.2,
                        duration: 0.7
                    })}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl md:text-4xl"
                >
                    Guidelines
                </motion.h3>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Submitting Your Work
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial="hidden"
                        whileInView="visible"
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        Before submitting your work, please ensure that your page is fully completed and thoroughly tested. When you're ready to contribute your code, follow these steps:
                    </motion.p>
                  <motion.ul
                      className='list-disc pl-5'
                      variants={animateSlideWhenScrolling(animateLeftProps)}
                      initial='hidden'
                      whileInView='visible'
                  >
                      <li className='mb-2'><span className='font-semibold'>Create a New Branch:</span><br/> Go to your project's repository. Click on the 'Branches' tab or use the command line to type <code>git checkout -b your-branch-name</code>. Give your branch a unique name (like <code>my-awesome-page</code>) so we know it's yours.</li>
                      <li className='mb-2'><span className='font-semibold'>Finish and Test Your Page:</span><br /> Make sure your entire page is done. Don't submit half-finished work! Test your page thoroughly to ensure there are no bugs. We don't want anything messing up the app.</li>
                      <li className='mb-2'><span className='font-semibold'>Submit a Pull Request:</span><br /> Once you're sure everything is perfect, go to the repository. Click on the 'Pull Requests' tab or use the command line to type <code>git push origin your-branch-name</code>. Create a new pull request. Make sure to select your branch for the request.</li>
                      <li className='mb-2'><span className='font-semibold'>Code Review:</span><br /> Someone will review your code to check if it's all good. If there's something wrong, we'll let you know so you can fix it.</li>
                  </motion.ul>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Configurations for Local Development
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        When working on your project locally, you'll need to adjust configurations in the following files. Make sure to revert these changes before submitting your pull request to ensure everything functions correctly in production.
                    </motion.p>
                    <motion.ul
                        className='list-disc pl-5'
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                    >
                        <li className='mb-2'>
                            <span className='font-semibold'>Configure Axios for Local Development:</span><br />
                            Open <code>/client/lib/axiosinstance.tsx</code>. Comment out the production configuration and ensure that the local development configuration is active.<br /><br />
                            Your file should look like this:<br /><br />
                            
                            <img src='https://i.gyazo.com/f313c7904284fad48d8272987c484907.png' alt='Axios Configuration Example' className='w-full max-w-md' /><br />
                            Ensure to uncomment the production configuration before submitting your pull request.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Configure Prisma for Local Development:</span><br />
                            Open <code>/server/prisma/Prisma.js</code>. Comment out the production configuration and ensure that the local development configuration is active.<br /><br />
                            Your file should look like this:<br /><br />
                            
                            <img src='https://i.gyazo.com/20b85e44be57cc8824d3fd106c179518.png' alt='Prisma Configuration Example' className='w-full max-w-md' /><br />
                            Remember to uncomment the production configuration before submitting your pull request.
                        </li>
                    </motion.ul>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Styling Rules for Your Page
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        When styling your page, ensure it is responsive and follows these guidelines to maintain consistency and readability across different devices.
                    </motion.p>
                    <motion.ul
                        className='list-disc pl-5'
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                    >
                        <li className='mb-2'>
                            <span className='font-semibold'>Responsiveness:</span><br />
                            Make sure your page is responsive on both mobile devices and larger screens. Use Flexbox and Grid layout utilities instead of absolute values like pixels. Focus on centering and spacing using classes such as <code>flex</code>, <code>grid</code>, <code>justify-center</code>, <code>justify-between</code>, <code>justify-evenly</code>, <code>items-center</code>, and similar.<br /><br />
                            <img src='https://i.gyazo.com/2c0234652bb4108b40469834f5f5226f.png' alt='Responsive Design Example' className='w-full max-w-md' /><br />
                            This approach ensures that your layout adapts smoothly across various screen sizes.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Using Animations:</span><br />
                            Refer to the animations provided in <code>/client/animations</code>. Specifically, use <code>AnimateSlide.tsx</code> and <code>AnimateSlideWhenScrolling.tsx</code> for smooth transitions and effects:
                            <ul className='list-disc pl-5 mt-2'>
                                <li className='mb-2'>
                                    <span className='font-semibold'>AnimateSlide:</span><br />
                                    This animation will trigger when the page initially loads. It provides smooth entrance effects for elements as the page is rendered.<br /><br />
                                    <img src='https://i.gyazo.com/b356efd5f0c70e08a7b4631b2aaa27cc.png' alt='AnimateSlide Configuration' className='w-full max-w-md' /><br />
                                </li>
                                <li className='mb-2'>
                                    <span className='font-semibold'>AnimateSlideWhenScrolling:</span><br />
                                    This animation activates when the div you are animating becomes visible on the page as the user scrolls. It is ideal for creating engaging scrolling effects and transitions.<br /><br />
                                    <img src='https://i.gyazo.com/57de61530ec1f7192e86bb59132f57c3.png' alt='AnimateSlideWhenScrolling Configuration' className='w-full max-w-md' /><br />
                                </li>
                            </ul>
                            These are easy-to-use, out-of-the-box animations that I've created for convenience. However, feel free to create and add more animations if you find additional effects are needed.<br />
                            Follow the provided images for examples on how to implement these animations effectively. Zoom in by using "ctrl scroll" if neccessary.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Using Shadcn Components:</span><br />
                            For buttons, inputs, and other UI elements, use the Shadcn components located in <code>/client/components/ui/the component needed</code>. Visit the Shadcn documentation to understand how to use these components. This ensures consistency in styling across the app.<br />
                            Utilizing these components helps maintain a uniform look and feel throughout the application.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Refer to the HomePage Structure:</span><br />
                            When structuring your code, refer to the <code>HomePage</code> for guidance. Aim to keep your code clean and readable, following best practices for layout and organization.<br />
                            This will help in maintaining consistency and readability in your codebase.
                        </li>
                    </motion.ul>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Adding Your Page to the Page Search and App
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        To ensure your page is accessible and searchable within the app, follow these steps:
                    </motion.p>
                    <motion.ul
                        className='list-disc pl-5'
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                    >
                        <li className='mb-2'><span className='font-semibold'>Add Your Page to the List of Pages:</span><br />
                            Navigate to <code>@lib/ListOfPages.tsx</code>. Inside the <code>ListOfPages</code> constant, add your page name and its corresponding path like this: <br /><br />
                            <code>{`{ name: 'Your Page Name', path: '/your-page-path' }`}</code><br />
                            Ensure that the name of your page is exactly how you want it to appear in the search, and the path correctly leads to your page.
                        </li>
                        <li className='mb-2'><span className='font-semibold'>Add Your Page to the Routes:</span><br />
                            In <code>app.tsx</code>, find the section where routes are defined. Add your page to the list of routes like this:<br /><br />
                            <code>{`<Route path="/your-page-path" element={<YourPageComponent />} />`}</code><br />
                            Replace <code>YourPageComponent</code> with the actual component for your page.
                        </li>
                    </motion.ul>
                </div>
                <div className='mb-12'>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        Server-Side Guidelines
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        To add a new route to the server, follow these steps to ensure your route is properly set up and secure.
                    </motion.p>
                    <motion.ul
                        className='list-disc pl-5'
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                    >
                        <li className='mb-2'>
                            <span className='font-semibold'>Create a Controller Function:</span><br />
                            In <code>/server/src/controllers</code>, you will find existing controllers such as <code>userController</code> and <code>authController</code>. If there is no existing controller for your function, create a new one. Define and export your asynchronous function in the relevant controller. Here's an example of how your function might look:<br /><br />
                            <img src='https://i.gyazo.com/54dd4f7bffaadf0faf922748ebabf4dc.png' alt='Controller Function Example' className='w-full max-w-md' /><br />
                            Ensure each response includes a status code. You can find a list of status codes here: <a href='https://www.npmjs.com/package/http-status-codes' className='text-blue-400 hover:underline' target='_blank' rel='noopener noreferrer'>HTTP Status Codes</a>.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Add Your Route:</span><br />
                            Navigate to <code>/server/src/routes</code> to find <code>authRoutes.js</code> and <code>userRoutes.js</code>. If your route does not already exist, create a new route file as needed. Define your route and map it to the controller function. An example of adding a route is shown below:<br /><br />
                            <img src='https://i.gyazo.com/b61d5fede69af81fc4914010715ac28d.png' alt='Route Example' className='w-full max-w-md' /><br />
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Apply Middleware:</span><br />
                            If you need to access the user information, use the middleware I've created to access the user ID directly. Add the verifyToken middleware between the route and the function. Note, the user has to be logged in for the middleware to work. <br/>Adding a route with this middleware would look like this:<br /><br />
                            <img src='https://i.gyazo.com/b61d5fede69af81fc4914010715ac28d.png' alt='Middleware Example' className='w-full max-w-md' /><br />
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Register Your Route:</span><br />
                            If you created a new route file, you need to register it in <code>/server/src/app.js</code>. Add your new route like this:<br /><br />
                            <img src='https://i.gyazo.com/b61d5fede69af81fc4914010715ac28d.png' alt='Register Route Example' className='w-full max-w-md' /><br />
                            <span>Example: The login route will now be at /api/users/login</span>
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Frontend Integration:</span><br />
                            On the frontend, use <code>axiosInstance</code> along with <code>tanstack/react-query</code> to interact with your new route. Here's an example of how this might look:<br /><br />
                            <img src='https://i.gyazo.com/14cbdc63ebf0f91a0d9718c3fabef462.png' alt='Frontend Integration Example' className='w-full max-w-md' /><br />
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Ensure Data Security:</span><br />
                            Make sure your routes are secure and do not expose passwords or sensitive information to the frontend. Always extract sensitive information before sending data to the client. An example of how to handle this is shown below:<br /><br />
                            <img src='https://i.gyazo.com/3f0b6861f052aad0dfc0fc1b3acd403d.png' alt='Data Security Example' className='w-full max-w-md' /><br />
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Schema Compatibility:</span><br />
                            If you need to add new schema models, ensure they are compatible with the existing schema to avoid issues. Review the current schema and integrate your models accordingly.
                        </li>
                    </motion.ul>
                </div>
                <div>
                    <motion.h4
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='text-xl md:text-2xl text-neutral-300 pb-4 mb-2 border-b border-slate-900'
                    >
                        General Information & Best Practices
                    </motion.h4>
                    <motion.p
                        variants={animateSlideWhenScrolling(animateRightProps)}
                        initial='hidden'
                        whileInView='visible'
                        className='tracking-tight text-lg mb-4 text-neutral-300'
                    >
                        Follow these guidelines to ensure a consistent and high-quality development experience throughout the project. This includes best practices for styling, adding pages, server routes, and type-safe forms.
                    </motion.p>
                    <motion.ul
                        className='list-disc pl-5'
                        variants={animateSlideWhenScrolling(animateLeftProps)}
                        initial='hidden'
                        whileInView='visible'
                    >
                        <li className='mb-2'>
                            <span className='font-semibold'>Responsive Design:</span><br />
                            Ensure all components and pages are responsive. Utilize flexible layouts with <code>flex</code> and <code>grid</code> utilities. Avoid absolute values like pixels. Use utility classes like <code>justify-center</code>, <code>justify-between</code>, and <code>items-center</code> for proper alignment and spacing. Always test your design on various screen sizes to ensure compatibility.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Adding Pages to the Application:</span><br />
                            To add a new page, update the <code>ListOfPages</code> and configure the route. In <code>@lib/ListOfPages.tsx</code>, add the page name and path to the list. Then, in <code>app.tsx</code>, define the route for your page. Make sure the path and component are correctly linked.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Configuring Axios and Prisma for Local Development:</span><br />
                            When developing locally, adjust the configuration for Axios and Prisma. Update <code>/client/lib/axiosinstance.tsx</code> to point to your local server and <code>/server/prisma/Prisma.js</code> accordingly. Be sure to revert these changes before submitting your pull request to avoid issues in production.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Creating Server Routes:</span><br />
                            To add new routes, create or update controllers and route files. Define your async functions in the appropriate controller and ensure each response has a proper status code. Update or create new route files in <code>/server/src/routes</code> and integrate them into <code>/server/src/app.js</code>. Secure your routes using middleware to handle sensitive user data appropriately.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Implementing Type-Safe Forms:</span><br />
                            Use <code>react-hook-form</code> and <code>zod</code> to create type-safe forms. Define your schema with <code>zod</code> and use <code>zodResolver</code> for validation. Ensure type safety by defining TypeScript types and handle form submission securely. For an example, refer to the <code>/client/pages/SignupPage/SignupForm.tsx</code> file.
                        </li>
                        <li className='mb-2'>
                            <span className='font-semibold'>Utilizing Animations:</span><br />
                            Use the provided animations in <code>/client/animations</code>, specifically <code>AnimateSlide.tsx</code> and <code>AnimateSlideWhenScrolling.tsx</code>, for smooth transitions. These animations are easy-to-use and ready out-of-the-box, but feel free to create additional animations if needed.
                        </li>
                    </motion.ul>
                </div>

            </div>
            <HomeFooter/>
        </div>
    )
}

export default Guide