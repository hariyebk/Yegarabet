import ProfilesCards from "@/components/ProfilesCards";
import hari from "/public/hari.jpg"
import RoommateFilter from "@/components/RoommateFilter";

interface Props {
    searchParams: {
        page: string
    }
}

export default async function page({searchParams} : Props){
    const page = searchParams.page || 1

    //TODO: FETCH USER PROFILES

    return (
        <main className='min-h-screen mt-24 mb-40 mx-5'>
            {/* SECTION FOR FILTERS */}
            <div className="pb-20">
                <RoommateFilter />
            </div>
            {/* FAKE DATA */}
            <section className="w-full flex flex-wrap items-center justify-start gap-6">
                {Array.from({length: 20}, (index, i) => {
                    return (
                        <ProfilesCards key={i} firstName="Harun" socials={[{
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
                    ]} image={hari} budget="10,000 birr / m" age={23} sex="Male" profession="Software developer" numberofRoommates={1} residenceLocation="Dire Dawa" i={i}/>
                    )
                })}
            </section>
        </main>
    )
}
