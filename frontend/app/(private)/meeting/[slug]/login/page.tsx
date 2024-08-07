'use client'
import { ReactElement } from 'react'
import Login from '@/client/website/meeting/login/login'
import styles from '@/app/(private)/meeting/[slug]/page.module.css'

export default function LoginMeetingPage():ReactElement {
    return (
       <main className={styles.main}>
           <Login />
       </main>
    )
}