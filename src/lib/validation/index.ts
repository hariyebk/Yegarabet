import { z } from "zod";

export const SiginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "password is required"}),
})

export const SignupFormSchema = z.object({
    firstName: z.string().min(1, {message: "first name is required"}).max(10, {message: "first name is too long"}),
    lastName: z.string().min(1, {message: "first name is required"}).max(10, {message: "first name is too long"}),
    email: z.string().email().min(1, {message: "email is required"}),
    gender: z.string().min(1, {message: "you didn't select gender"}),
    birthDate: z.string().min(1, {message: "birth date is required"}),
    phoneNumber: z.string(),
    city: z.string().min(1, {message: "city is required"}),
    password: z.string().min(1, {message: "password is required"}),
    passwordConfirm: z.string().min(1, {message: "please re-enter your password here"}),
    description: z.string().min(1, {message: "please describe yourself here"})
}).refine((value) => {
    // convert the string into date
    const birthdate = new Date(value.birthDate);
    // get today's date
    const today = new Date();
    // compare if the user is at least 18 years old
    const age = today.getFullYear() - birthdate.getFullYear();
    const isAtLeast18 = age >= 18;

    return isAtLeast18
    }, {
        message: 'You Must be at least 18 years old',
        path: ["birthDate"]
    }
).refine(value => {
    return value.passwordConfirm !== value.password
    },
    {
        message: "password doesn't macth",
        path: ["passwordConfirm"]
    }
)