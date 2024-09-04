# Allcode Community Project

Welcome to the Allcode Community Project! This README will guide you through setting up, styling, and adding new features to the project. Whether you're adding new pages, working on the server side, or handling forms, this guide will help you do it smoothly.

## Table of Contents

- [Project Setup](#project-setup)
- [Styling Guidelines](#styling-guidelines)
- [Adding Pages](#adding-pages)
- [Server-Side Development](#server-side-development)
- [Form Handling](#form-handling)
- [General Information & Best Practices](#general-information--best-practices)

## Project Setup

### Submitting Your Work

1. **Create a New Branch:**
   - Go to your project's repository.
   - Click on the 'Branches' tab or use the command line:
     ```bash
     git checkout -b your-branch-name
     ```
   - Choose a unique branch name (e.g., `feature/new-page`).

2. **Complete and Test Your Page:**
   - Ensure your page is fully completed.
   - Test it thoroughly to make sure there are no bugs.

3. **Submit a Pull Request:**
   - Push your branch to the repository:
     ```bash
     git push origin your-branch-name
     ```
   - Create a pull request (PR) in the repository.
   - Make sure to select your branch for the PR.

4. **Code Review:**
   - Your code will be reviewed by the team.
   - Address any feedback and make necessary adjustments.

5. **Local Development Changes:**
   - If you made changes for local development (e.g., API endpoints, configurations), remember to revert these changes before submitting your pull request. This ensures the code works correctly in production.

## Styling Guidelines

- **Responsive Design:** 
  - Ensure all components work well on both mobile devices and larger screens.
  - Use flexible layouts with `flex` and `grid`. Avoid using fixed sizes like pixels.
  - Utilize classes like `justify-center`, `justify-between`, and `items-center` for proper alignment and spacing.

- **Consistency:** 
  - Refer to the [HomePage](#) for a clean and consistent code structure.

- **Component Usage:**
  - Use ShadCN components for buttons, inputs, and other UI elements. Check the [ShadCN Docs](https://ui.shadcn.dev) for usage details.

## Adding Pages

1. **Update the List of Pages:**
   - Open `@lib/ListOfPages.tsx`.
   - Add your new page with its name and path:
     ```typescript
     { name: 'Your Page Name', path: '/your-page-path' }
     ```

2. **Add a Route:**
   - Open `app.tsx`.
   - Define the route for your page:
     ```tsx
     <Route path="/your-page-path" element={<YourPageComponent />} />
     ```

## Server-Side Development

1. **Creating a New Route:**

   - **Create or Update Controller:** 
     - Add your function in `controllers` (e.g., `userController.ts` or `authController.ts`).
     - Example:
       ```typescript
       export const myFunction = async (req, res) => {
           res.status(200).json({ message: 'Success' });
       };
       ```

   - **Update Routes:**
     - Add your route in `routes` (e.g., `authRoutes.ts` or `userRoutes.ts`).
     - Example:
       ```typescript
       router.post('/my-endpoint', myControllerFunction);
       ```

   - **Secure Routes with Middleware:**
     - Example:
       ```typescript
       router.get('/secure-endpoint', verifyToken, secureControllerFunction);
       ```

   - **Integrate Routes:**
     - Add your routes to `app.js`:
       ```javascript
       app.use('/api/auth', authRoutes);
       ```

2. **Configure Axios and Prisma for Local Development:**

   - **Axios:**
     - Edit `/client/lib/axiosinstance.tsx` to use your local server URL:
       ```typescript
       const axiosInstance = axios.create({
           baseURL: 'http://localhost:8080',
           headers: { 'x-access-token': localStorage.getItem("token") },
       });
       ```

   - **Prisma:**
     - Edit `/server/prisma/Prisma.js` to use your local database configuration:
       ```javascript
       const prisma = new PrismaClient();
       ```

   - **Important:** Remember to revert these changes before submitting your pull request to ensure everything works correctly in production.

## Form Handling

1. **Type-Safe Forms with React Hook Form and Zod:**

   - **Setup:**
     - Use `react-hook-form` and `zod` to manage form state and validation.
     - Example form setup:
       ```typescript
       import { useForm } from 'react-hook-form';
       import { z } from 'zod';
       import { zodResolver } from '@hookform/resolvers/zod';

       const userSchema = z.object({
           firstName: z.string().min(3).max(25),
           lastName: z.string().min(3).max(25),
           email: z.string().email(),
           password: z.string().min(8),
           confirmPassword: z.string().min(1),
       }).refine(data => data.password === data.confirmPassword, {
           message: "Passwords do not match",
           path: ["confirmPassword"],
       });

       type UserFormValues = z.infer<typeof userSchema>;

       export default function SignUpForm() {
           const form = useForm<UserFormValues>({ resolver: zodResolver(userSchema) });
           // form handling code
       }
       ```

## General Information & Best Practices

1. **Code Cleanliness:**
   - Write clean, readable, and well-organized code.
   - Follow existing project conventions and structure.

2. **Testing:**
   - Thoroughly test your pages and server routes to ensure they work as expected.

3. **Security:**
   - Avoid sending sensitive information like passwords to the frontend.
   - Ensure that sensitive data is properly sanitized and handled on the server.

4. **Documentation:**
   - Document your code clearly.
   - Update this README with any new instructions or guidelines as needed.

By following these guidelines, you’ll contribute effectively to the Allcode Community Project and help maintain a high-quality development environment for everyone involved.
