import { z } from "zod";

export const SiginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: "password is required"}),
})

export const SignupFormSchema = z.object({
    firstName: z.string().min(1, {message: "first name is required"}).max(10, {message: "first name is too long"}),
    lastName: z.string().min(1, {message: "first name is required"}).max(10, {message: "last name is too long"}),
    email: z.string().min(1, {message: "email is required"}).email(),
    gender: z.string().min(1, {message: "you didn't select your gender"}),
    birthDate: z.string().min(1, {message: "birth date is required"}),
    phoneNumber: z.string().min(9, {message: "invalid phone number"}).max(9, {message: "remove 0 at the start"}).regex(/^[0-9]+$/),
    city: z.string().min(1, {message: "city is required"}),
    profession: z.string().min(1, {message: "profession is required"}).max(25, {message: "professtion is too long"}),
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
    image: z.custom<File[]>().optional(),
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

export const QuestionsSchema = z.object({
    gender: z.object({question: z.string(), answer: z.string()}),
    age: z.object({question: z.string(), answer: z.string()}),
    guest: z.object({question: z.string(), answer: z.string()}),
    pets: z.object({question: z.string(), answer: z.string()}),
    drugs: z.object({question: z.string(), answer: z.string()}),
    occupation: z.object({question: z.string(), answer: z.string()}),
    cleanlines: z.object({question: z.string(), answer: z.string()}),
    lateNight: z.object({question: z.string(), answer: z.string()})
}).refine(
    (value) => {
        return Boolean(value.gender.answer)
    },
    {
        message: "No answer provided",
        path: ["gender"]
    }
).refine(
    (value) => {
        return Boolean(value.age.answer)
    },
    {
        message: "No answer provided",
        path: ["age"]
    }
).refine(
    (value) => {
        return Boolean(value.guest.answer)
    },
    {
        message: "No answer provided",
        path: ["guest"]
    }
).refine(
    (value) => {
        return Boolean(value.pets.answer)
    },
    {
        message: "No answer provided",
        path: ["pets"]
    }
).refine(
    (value) => {
        return Boolean(value.drugs.answer)
    },
    {
        message: "No answer provided",
        path: ["drugs"]
    }
).refine(
    (value) => {
        return Boolean(value.occupation.answer)
    },
    {
        message: "No answer provided",
        path: ["occupation"]
    }
).refine(
    (value) => {
        return Boolean(value.cleanlines.answer)
    },
    {
        message: "No answer provided",
        path: ["cleanlines"]
    }
).refine(
    (value) => {
        return Boolean(value.lateNight.answer)
    },
    {
        message: "No answer provided",
        path: ["lateNight"]
    }
)