import { ReactElement } from 'react'
import ResetMeeting from '@/client/website/meeting/reset/reset'
import styles from '@/app/(private)/meeting/[slug]/register/page.module.css'

export default function ResetMeetingPage():ReactElement {
   return (
      <main className={styles.main}>
         <ResetMeeting />
      </main>
   )
}