'use client'
import {ReactElement} from 'react'
import { usePathname } from 'next/navigation'
import ForgotPassword  from '@/client/components/public/reset'

export default function ResetMeeting():ReactElement {
   const pathname = usePathname()
   const after = pathname.replace('/reset', '')
   const back = pathname.replace('/reset', '/login')

   return (
      <>
         <ForgotPassword back={back} after={after} />
      </>
   )
}