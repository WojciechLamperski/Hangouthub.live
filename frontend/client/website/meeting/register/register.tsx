'use client'
import React, { ReactElement } from 'react'
import Register from '@/client/components/public/register'
import { usePathname } from 'next/navigation'

export default function RegisterMeeting():ReactElement {

   const pathname = usePathname()
   const login = pathname.replace('/register', '/login')
   const after = pathname.replace('/register', '')

   return (
      <>
         <Register login={login} after={after} />
      </>
   )
}
