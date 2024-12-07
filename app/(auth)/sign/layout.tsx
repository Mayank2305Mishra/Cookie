import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Signup | Cookie",
    description: "Where cooking meets inspiration",
    icons: "./favicon.ico"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full bg-black-3 h-screen'>
            {children}
        </div>
    )
}