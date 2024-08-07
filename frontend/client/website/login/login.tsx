import Login from '@/client/components/public/login'

export default function LoginMain() {

   return (
      <>
         <Login after={'/dashboard'} register={'/register'} reset={'/reset'} />
      </>
   )
}