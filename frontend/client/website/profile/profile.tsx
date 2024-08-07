'use client'
import React, {ReactElement} from 'react'
import { useClerk, useUser } from '@clerk/nextjs'
import Container from '@mui/material/Container'
import Greeting from '@/client/website/dashboard/greeting'
import styles from './profile.module.css'
import Link from 'next/link'

export default function Profile():ReactElement {

   const { signOut } = useClerk()
   const { user } = useUser()

   const deleteUser = () => {
      if(user){
         void user.delete()
         void signOut({ redirectUrl: '/register' })
      } else{
         void signOut({ redirectUrl: '/register' })
      }
   }

   return (
      <section className={styles.section}>
         <Container maxWidth="xs">
            <div className={styles.wrapper}>
               <h1 className={styles.title}>
                  Profile
               </h1>
               <Greeting />
               <button className={styles.delete} onClick={deleteUser}>
                  Delete my user profile
               </button>
               <Link href={'/dashboard'}>
                  Go back to dashboard
               </Link>
               <br />
            </div>
         </Container>
      </section>
   )
}