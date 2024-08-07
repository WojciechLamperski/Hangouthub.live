import { ReactElement } from 'react'
import Register from '@/client/website/register/register'
import styles from './page.module.css'

export default function RegisterMainPage():ReactElement {
   return (
      <main className={styles.main}>
         <Register />
      </main>
   )
}