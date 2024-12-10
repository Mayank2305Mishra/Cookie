import { cn } from '@/lib/utils'
import React from 'react'

const PodcastPlayer = () => {
  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
      })}
    >
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <div className="flex items-center gap-4 max-md:hidden">
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              
            </h2>
            <p className="text-12 font-normal text-white-2"></p>
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            
            <h2 className="text-12 font-bold text-white-4">-5</h2>
          </div>
          
          <div className="flex items-center gap-1.5">
            <h2 className="text-12 font-bold text-white-4">+5</h2>
            
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            
          </h2>
          <div className="flex w-full gap-2">
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default PodcastPlayer