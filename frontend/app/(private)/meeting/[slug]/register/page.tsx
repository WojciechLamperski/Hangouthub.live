import { ReactElement } from 'react'
import Register from '@/client/website/meeting/register/register'
import styles from './page.module.css'

export default function RegisterMeetingPage():ReactElement {
   return (
      <main className={styles.main}>
         <Register />
      </main>
   )
}