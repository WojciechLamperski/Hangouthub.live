import {ReactElement} from 'react'
import { usePathname } from 'next/navigation'
import Login from '@/client/components/public/login'

export default function LoginMeeting():ReactElement {
   const pathname = usePathname()
   const url = pathname.replace('/login', '')
   const register = pathname.replace('/login', '/register')
   const reset = pathname.replace('/login', '/reset')

   return (
      <>
         <Login after={url} register={register} reset={reset} />
      </>
   )
}