import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login | Cookie",
    description: "Where cooking meets inspiration",
    icons: "./favicon.ico"
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full h-screen'>
            {children}
        </div>
    )
}