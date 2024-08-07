import { ReactElement } from 'react'
import Profile from '@/client/website/profile/profile'
import styles from './page.module.css'

export default function ProfilePage():ReactElement {
   return (
      <main className={styles.main}>
         <Profile />
      </main>
   )
}