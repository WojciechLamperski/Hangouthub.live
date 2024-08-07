import { ReactElement } from 'react'
import Meeting from '../../../../client/website/meeting/meeting'
import styles from './page.module.css'

export default function MeetingPage():ReactElement {
   return (
      <main className={styles.main}>
         <Meeting />
      </main>
   )
}