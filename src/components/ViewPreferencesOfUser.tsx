import { IoCloseCircleSharp } from "react-icons/io5";
import ProfilesCards from "./ProfilesCards";
import user from "/public/user.png"

interface Props {
    setViewProfile: React.Dispatch<React.SetStateAction<boolean>>
    preferences?: {question: string, answer: string}[]
}

export default function ViewPreferencesOfUser({setViewProfile, preferences} : Props) {
    return (
        <section className='absolute top-16 right-0 max-sm:w-[300px] sm:w-[450px] md:w-[550px] lg:w-[600px] h-auto bg-card border border-slate-700 z-20 pl-10 md:pr-7 py-7'>
            <div className="h-full overflow-y-scroll custom-scrollbar pr-5">
                <div className="flex items-center justify-end">
                    <button onClick={() => setViewProfile(false)}>
                        <IoCloseCircleSharp className="w-8 h-8 text-button" />
                    </button>
                </div>
                <div className="mt-5 max-lg:hidden">
                    <ProfilesCards firstName="Eliyas" socials={[{
                            type: "instagram",
                            link: "https://instagram.com/hariyebk",
                        },
                        {
                            type: "telegram",
                            link: "https://t.me/haribk",
                        },
                        {
                            type: "linkedln",
                            link: "https://t.me/haribk",
                        }
                    ]} image={user} budget="10,000 birr / m" age={21} sex="Male" profession="User Student" numberofRoommates={1} residenceLocation="Dire Dawa" i={4} details={true}/>
                </div>
                <h3 className="text-xl text-primary font-semibold mt-8 underline underline-offset-2"> Quiz Answers </h3>
                <ul className="mt-4 mb-10">
                    <li>
                        {preferences?.map((item, index) => {
                            return (
                                <div key={index} className="text-base text-primary mt-4">
                                    <p> {item.question} </p>
                                    <p className="font-bold mt-2 ml-3"> - {item.answer} </p>
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>
        </section>
    )
}
