import ProfilesCards from "@/components/ProfilesCards";
import user from "/public/user.png"
import RoommateFilter from "@/components/RoommateFilter";
import Pagination from "@/components/small-peices/Pagination";
import { SearchProvider } from "@/context/SearchContext";


interface Props {
    searchParams: {
        page: string
    }
}

export default async function page({searchParams} : Props){
    const page = searchParams.page || 1

    return (
        <main className='min-h-screen mt-24 mb-40 mx-5'>
            {/* SECTION FOR FILTERS */}
            <SearchProvider>
                <div className="pb-20">
                    <RoommateFilter />
                </div>
                {/* FAKE DATA */}
                <section className="w-full flex flex-wrap items-center max-xl:justify-center xl:justify-start sm:gap-10 md:gap-14 xl:gap-5 max-sm:mt-5 sm:mt-10 xl:mt-5">
                    {Array.from({length: 20}, (index, i) => {
                        return (
                            <ProfilesCards key={i} firstName="Eliyas" socials={[{
                                type: "instagram",
                                link: "https://instagram.com",
                            },
                            {
                                type: "telegram",
                                link: "https://t.me",
                            },
                            {
                                type: "linkedln",
                                link: "https://t.me",
                            }
                        ]} image={user} budget="3,000 birr / m" age={21} sex="Male" profession="University Students" numberofRoommates={1} residenceLocation="Dire Dawa" i={i}/>
                        )
                    })}
                </section>
                <div className="mt-24 flex items-start xl:justify-between">
                    <div className="w-[300px] max-xl:hidden">
                        <p className="text-lg text-primary"> Total number of results &nbsp;  {20}</p>
                    </div>
                    <Pagination TotalResults={60} />
                </div>
            </SearchProvider>
        </main>
    )
}