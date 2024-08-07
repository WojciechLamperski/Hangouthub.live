import { ReactElement } from 'react'
import Dashboard from '../../../client/website/dashboard/dashboard'
import styles from './page.module.css'

export default function DashboardPage():ReactElement {
   return (
      <main className={styles.main}>
         <Dashboard/>
      </main>
   )
}
