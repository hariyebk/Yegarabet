import SignupForm from "@/components/forms/SignupForm";

export default async function page() {
    return (
        <main className='min-h-screen mb-28'>
            <div className="mt-24">
                <SignupForm />
            </div>
        </main>
    )
}
