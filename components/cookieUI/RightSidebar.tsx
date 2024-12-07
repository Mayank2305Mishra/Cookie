'use client';

import React from 'react'
import { useRouter } from 'next/navigation';

const RightSidebar = () => {
  const router = useRouter();

  return (
    <section className='right_sidebar h-[calc(100vh-5px]'>
      <section>
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <div className="flex flex-col gap-6">
          Top recipe of today
        </div>
      </section>
    </section>
  )
}

export default RightSidebar