import { z } from "zod";

export const SiginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "password is required"}),
})

export const SignupFormSchema = z.object({
    firstName: z.string().min(1, {message: "first name is required"}).max(10, {message: "first name is too long"}),
    lastName: z.string().min(1, {message: "first name is required"}).max(10, {message: "first name is too long"}),
    email: z.string().min(1, {message: "email is required"}).email(),
    gender: z.string().min(1, {message: "you didn't select your gender"}),
    birthDate: z.string().min(1, {message: "birth date is required"}),
    phoneNumber: z.string().min(9, {message: "invalid phone number"}).max(9, {message: "remove 0 at the start"}).regex(/^[0-9]+$/),
    city: z.string().min(1, {message: "city is required"}).max(10, {message: "city is too long"}),
    profession: z.string().min(1, {message: "profession is required"}).max(14, {message: "professtion is too long"}),
    password: z.string().min(1, {message: "password is required"}),
    passwordConfirm: z.string().min(1, {message: "please re-enter your password here"}),
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
    return value.passwordConfirm === value.password
    },
    {
        message: "password doesn't macth",
        path: ["passwordConfirm"]
    }
)

export const SecondStepSchema = z.object({
    facebook: z.object({type: z.string(), link: z.string()}).optional(),
    instagram: z.object({type: z.string(), link: z.string()}).optional(),
    telegram: z.object({type: z.string(), link: z.string()}).optional(),
    budget: z.string().min(1, {message: "budget is required"}).regex(/^[\d,]+$/),
    description: z.string().min(1, {message: "this field is required"})
}).refine(
    (value) => {
        return !value.facebook ? true : value.facebook.link.startsWith("https://www.facebook.com")
    },
    {
        message: "Invalid link",
        path: ["facebook"]
    }
).refine(
    (value) => {
        return !value.instagram ? true : value.instagram.link.startsWith("https://www.instagram.com")
    },
    {
        message: "Invalid link",
        path: ["instagram"]
    }
).refine(
    (value) => {
        return !value.telegram ? true : value.telegram.link.startsWith("https://t.me/")
    },
    {
        message: "Invalid link",
        path: ["telegram"]
    }
)