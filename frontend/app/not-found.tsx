'use client'
import { ReactElement } from 'react'
import { navigateDashboard } from './actions'
import styles from './not-found.module.css'

export default function NotFoundPage():ReactElement {
   return (
      <main className={styles.main}>
         <h1>Can&#39;t find this page</h1>
         <button onClick={()=>navigateDashboard()}>Go to Dashboard</button>
      </main>
   )
}