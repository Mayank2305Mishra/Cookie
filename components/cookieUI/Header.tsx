import React from 'react'
import Image from 'next/image'
import Logo from '@/app/assets/image.png'
const Header = ({style}:{style?:string}) => {
    return (
        <div className={`${style} flex flex-row justify-center text-center items-center gap-2`}>
            <Image src={Logo} alt='.' className='flex w-[38px] h-[38px]' />
            <h1 className=' font-black '>Cookie</h1>
        </div>
    )
}

export default Header