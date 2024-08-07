import { ReactElement } from 'react'
import ResetMain from '@/client/website/reset/reset'
import styles from './page.module.css'

export default function ResetMainPage():ReactElement {
   return (
       <main className={styles.main}>
          <ResetMain/>
       </main>
    )
}