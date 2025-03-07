import { GetCurrentUser } from '@/actions'
import { UserMenu } from './UserMenu'
import { Nav } from './Nav'

export default async function Navbar() {
    const user = await GetCurrentUser()

    return (
        <main className="w-full bg-background h-[80px] fixed inset-y-0 top-0 max-sm:px-5 sm:px-9 max-md:py-5 md:p-7 shadow shadow-black max-xl:z-20 xl:z-10">
            <nav className="flex items-center justify-between md:px-10 ">
                <Nav />
                <UserMenu user={user} />
            </nav>
        </main>
    )
}
