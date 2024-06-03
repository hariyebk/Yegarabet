import addisababa from "/public/cities/addisababa.png"
import adama from "/public/cities/adama.jpg"
import mekelle from "/public/cities/mekele.jpg"
import hawassa from "/public/cities/hawassa.jpg"
import bahirdar from "/public/cities/bahirdar.jpg"
import diredawa from "/public/cities/diredawa.jpg"
import harar from "/public/cities/harar.jpg"
import arbaminch from "/public/cities/arbaminch.jpg"


export const Nav_Links = [
    {
        label: "Find Roommates",
        path: "/find-roommates"
    },
    {
        label: "How it works",
        path: "/#how-it-works"
    },
    {
        label: "Safety tips",
        path: "/safety-tips"
    },
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
                path: "/#contact-us"
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
                path: "/#how-it-works"
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
    }
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
        answer: "Male"
    },
    {
        question: "Would it okay if your roommate brings someone home ?",
        answer: "Depends on the situation"
    },
    {
        question: "Are you comfortable with your roommate having pets ?",
        answer: "No"
    },
    {
        question: "Are you okay with a roommate who smokes or drinks ?",
        answer: "No"
    },
    {
        question: "What type of roommate do you prefer ?",
        answer: "Student"
    },
    {
        question: "How important is cleanliness to you in a roommate ?",
        answer: "Very important"
    },
    {
        question: "Is it okay if your roommate comes home late at night ?",
        answer: "Yes"
    }
]
export enum QUERY_PARAMS {
    name = "name",
    gender = "gender",
    city = "city",
    min = "min-age",
    max = "max-age",
    room = "room",
    sort = "sort",
    page = "page"
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
export const SAFETY_TIPS = [
    {
        title: "Do your research",
        description: "Look into your potential roommate's social media profiles and online presence to validate their looks and the information they provided on this platform."
    },
    {
        title: "Respect each other's differences",
        description: "You need to respect each other's differences, values, and cultures. Understand that you may have different backgrounds, beliefs, and lifestyles, and be open to learning from each other."
    },
    {
        title: "Be honest and open",
        description: "Be upfront about your expectations, boundaries, and concerns with your potential roommate. This will help you both get on the same page and avoid any misunderstandings."
    },
    {
        title: "Plan for the unexpected",
        description: "Have a plan in place in case you and your roommate no longer want to live together. This can include discussing who will stay in the room and who has to leave."
    },
    {
        title: "use written agreements",
        description: "Create a roommate agreement that outlines the terms of your living arrangement, including rent, utilities, and responsibilities. This will help prevent conflicts and provide a clear understanding of expectations."
    },
    {
        title: "Respect each other's privacy",
        description: "Remember that you're living with a stranger, so respect each other's personal space and belongings. Be willing to compromise and adapt to changing circumstances."
    }
]
export type IcontextType = {
    openPreference: boolean,
    setOpenPreference: React.Dispatch<React.SetStateAction<boolean>>
    openFilter: boolean,
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
}
export const ASCENDING = "ascending"
export const DESCENDING = "descending "
export const PAGE_SIZE = 20
export const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""