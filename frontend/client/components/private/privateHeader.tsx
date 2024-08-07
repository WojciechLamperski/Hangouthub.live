'use client'
import { ReactElement } from 'react'
import Link from 'next/link'
import { useClerk } from '@clerk/nextjs'
import Container from '@mui/material/Container'
import styles from './header.module.css'

export default function PrivateHeader():ReactElement {
   const { signOut } = useClerk()

   return (
      <header className={styles.header}>
         <Container maxWidth="lg" fixed>
            <div className={styles.content}>
               <Link className={styles.anchor} href="/dashboard">
                  <div className={styles.logo}>
                     <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px"
                          viewBox="0 0 100 100">
                        <g>
                           <path d="M73.9,27c-3.9,0-7.1,3.2-7.1,7.1c0,0.6,0.1,1.1,0.2,1.6l-6.7,4.4c-2.1-2.4-5.1-4-8.6-4
                              c-2.6,0-5,0.9-6.9,2.4l-11-7.6c0.7-2.9-0.8-6.1-3.6-7.4c-3.3-1.5-7.2-0.1-8.7,3.1s-0.1,7.2,3.1,8.7c1.7,0.8,3.6,0.8,5.3,0.1
                              l11.3,7.9c-0.5,1.2-0.8,2.6-0.8,4c0,0.8,0.1,1.5,0.2,2.3l-6.9,2.5c-0.9-1-2.1-1.8-3.6-2.2c-3.9-1.1-8,1.2-9.1,5.2
                              c-1.1,3.9,1.2,8,5.2,9.1c3.9,1.1,8-1.2,9.1-5.2c0.1-0.4,0.2-0.8,0.2-1.2l7.9-2.8c2.1,2.2,5,3.6,8.2,3.6c0.3,0,0.6,0,0.9,0l1.1,5.6
                              c-2.1,1.7-3.3,4.4-3,7.2c0.4,4.6,4.5,7.9,9.1,7.5c4.6-0.4,7.9-4.5,7.5-9.1c-0.4-4.1-3.7-7.2-7.7-7.5l-1.2-5.9
                              c2.8-2,4.7-5.4,4.7-9.1c0-0.6-0.1-1.2-0.1-1.7l7.9-5.2c1,0.5,2.1,0.8,3.2,0.8c3.9,0,7.1-3.2,7.1-7.1C81,30.2,77.8,27,73.9,27z
                               M51.7,54.6c-4,0-7.2-3.2-7.2-7.2c0-4,3.2-7.2,7.2-7.2c4,0,7.2,3.2,7.2,7.2C58.9,51.3,55.7,54.6,51.7,54.6z"/>
                           <circle cx="51.8" cy="47.4" r="3.2"/>
                        </g>
                     </svg>
                     <h1 className={styles.title}>
                        Hangout Hub
                     </h1>
                  </div>
               </Link>
               <div className={styles.ui}>
                  <button className={styles.nav} onClick={() => signOut({ redirectUrl: '/login' })}>log out</button>
               </div>
            </div>
         </Container>
      </header>
   )
}