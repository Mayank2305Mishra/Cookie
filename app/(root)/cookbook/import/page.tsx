import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 mt-10'>
      <h1 className='text-2xl font-bold text-cream-1' >Import Cookbook</h1>
      <h1 className='text-md text-gray-400'>Import any cookbook present on cookie by its URL</h1>
      <div className='flex flex-row gap-1'>
        <Input type='url' placeholder='Enter the url' className='input-form'/>
        <Button className='px-4 text-black-1 h-12 font-semibold  bg-cream-1 rounded-lg '>Import</Button>
      </div>
    </div>
  )
}

export default page