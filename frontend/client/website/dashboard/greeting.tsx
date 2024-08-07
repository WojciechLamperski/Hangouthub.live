'use client'
import { ReactElement } from 'react'
import { useUser } from '@clerk/nextjs'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './greeting.module.css'

export default function Greeting():ReactElement {
   // should I use isSignedIn and isLoaded as a next defence line for unregistered users?
   const { user } = useUser()
   return (
       <section className={styles.section}>
          <h1 className={styles.greeting}>Hello {user!==undefined ? user?.username : <CircularProgress size="1rem" />} !</h1>
       </section>
    )
}