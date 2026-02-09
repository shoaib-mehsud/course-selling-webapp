import z from 'zod';

const signupValidator = z.object({
    firstName: z.string().min(3,"First name too short").max(15,"First name too long"),
    lastName: z.string().min(2,"Last name too short").max(20,"Last name too long"),
    email: z.string().email("Invalid email"),
    password: z.string()
            .min(8, "Password too short")
            .max(32,"Password too long")
            .regex(/[A-Z]/, "Must have uppercase")
            .regex(/[0-9]/, "Must have number")
})

export default signupValidator;