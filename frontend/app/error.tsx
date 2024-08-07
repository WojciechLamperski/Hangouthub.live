'use client'
import styles from './error.module.css'

export default function GlobalError({ error, reset }: {error: Error & {digest?: string}, reset: () => void}) {
   console.error(error)
   return (
      <main className={styles.main}>
         <h1>Something went wrong, please try again later.</h1>
      </main>
   )
}