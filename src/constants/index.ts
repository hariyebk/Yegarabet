import addisababa from "/public/cities/addisababa.png"
import adama from "/public/cities/adama.jpg"
import mekelle from "/public/cities/mekele.jpg"
import hawassa from "/public/cities/hawassa.jpg"
import bahirdar from "/public/cities/bahirdar.jpg"
import diredawa from "/public/cities/diredawa.jpg"
import harar from "/public/cities/harar.jpg"
import arbaminch from "/public/cities/arbaminch.jpg"
import gonder from "/public/cities/gonder.jpg"
import jimma from "/public/cities/jimma.jpg"
import { string } from "zod"


export const Nav_Links = [
    {
        label: "Find Roommates",
        path: "/find-roommates"
    },
    {
        label: "How it works",
        path: "/how-it-works"
    },
    {
        label: "Safety tips",
        path: "/safety-tips"
    },
    {
        label: "About us",
        path: "/about"
    }
]
export const Footer_Links = [
    {
        title: "Legal",
        links: [
            {
                label: "Privacy Policy",
                path: "/privacy-policy"
            },
            {
                label: "Terms & Conditions",
                path: "/tos"
            },
            {
                label: "Cookie Policy",
                path: "/cookie-policy"
            }
        ]
    },
    {
        title: "Support",
        links: [
            {
                label: "Help and Support",
                path: "/help"
            },
            {
                label: "FAQs",
                path: "/faq"
            },
            {
                label: "Contact us",
                path: "#contact-us"
            }
        ]
    },
    {
        title: "Explore",
        links: [
            {
                label: "Find Roommates",
                path: "/find-roommates"
            },
            {
                label: "Safety Tips",
                path: "/safety-tips"
            },
            {
                label: "How it works",
                path: "/how-it-works"
            }
        ]
    }
]
export const Cities_Images = [
    {
        image: addisababa,
        label: "Addis Ababa"
    },
    {
        image: adama,
        label: "Adama"
    },
    {
        image: mekelle,
        label: "Mekelle"
    },
    {
        image: hawassa,
        label: "Hawassa"
    },
    {
        image: bahirdar,
        label: "Bahirdar"
    },
    {
        image: diredawa,
        label: "Dire Dawa"
    },
    {
        image: harar,
        label: "Harar"
    },
    {
        image: arbaminch,
        label: "Arbaminch"
    },
    {
        image: gonder,
        label: "Gonder"
    },
    {
        image: jimma,
        label: "Jimma"
    },
]
export const Steps = [
    {
        title: "Register",
        description: "Answer a few questions about yourself, your lifestyle, and your preferences, and we'll match you with compatible roommates.",
        path: '/signup'
    },
    {
        title: "Explore",
        description: "Browse through profiles, photos, and interests of other people to find the right match in your local area.",
        path: '/find-roommates'
    },
    {
        title: "Connect",
        description: "Reach out to your potential roommates through our platform and start building a meaningful connection",
        path: "/find-roommates"
    }
]
export const dummyData = [
    {
        firstName: "Harun",
        roommates: 2
    }
]
export const cities = [
    "All",
    "Addis Ababa",
    "Dire Dawa",
    "Mekele",
    "Hawasa",
    "Bahirdar",
    "Adama",
    "Gonder",
    "Harar",
    "Shashemene",
    "Jimma",
    "Dessie",
    "Arba minch",
    "Hosana"
]

type SOCIALS_TYPE = {
    facebook: number,
    instagram: number,
    telegram: number
} & { [key: string]: number }

export const SOCIALS : SOCIALS_TYPE = {
    facebook: 1,
    instagram: 2,
    telegram: 3,
} 
export const BUDGET_PERIOS = [
    "per day",
    "per week",
    "per month",
    "per year"
]
export const preferences = [
    {
        question: "Preferred roommate gender ?",
        answers: [
            "Male",
            "Female", 
            "It doesn't matter"
        ]
    },
    {
        question: "Would it okay if your roommate brings someone home ?",
        answers: [
            "Yes",
            "No", 
            "Depends on the situation"
        ]
    },
    {
        question: "Are you comfortable with your roommate having pets ?",
        answers: [
            "Yes",
            "No", 
            "Depends on the pet"
        ]
    },
    {
        question: "Are you okay with a roommate who smokes or drinks ?",
        answers: [
            "Yes",
            "No", 
            "Occasional use is okay"
        ]
    },
    {
        question: "What type of roommate do you prefer ?",
        answers: [
            "Student",
            "Worker", 
            "It doesn't matter"
        ]
    },
    {
        question: "How important is cleanliness to you in a roommate ?",
        answers: [
            "Very important",
            "Somewhat important", 
            "Not very important"
        ]
    },
    {
        question: "Is it okay if your roommate comes home late at night ?",
        answers: [
            "Yes",
            "No", 
            "Occasional is okay"
        ]
    }
]
export enum QUERY_PARAMS {
    name = "name",
    gender = "gender",
    city = "city",
    min = "min-age",
    max = "max-age",
    room = "room",
    sort = "sort"

}
export const GENDER_VALUES = [
    {
        value: "all",
        label: "All"
    },
    {
        value: "male",
        label: "Male"
    },
    {
        value: "female",
        label: "Female"
    }
]

export const ASCENDING = "ascending"
export const DESCENDING = "descending "