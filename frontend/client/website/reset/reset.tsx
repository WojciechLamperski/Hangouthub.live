import ForgotPassword from '@/client/components/public/reset'

export default function ResetMain() {

   return (
      <>
         <ForgotPassword after={'/dashboard'} back={'/login'} />
      </>
   )
}