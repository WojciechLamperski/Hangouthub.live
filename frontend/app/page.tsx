import { ReactElement } from 'react'
import Intro from '@/client/website/intro'
import styles from './page.module.css'

export default function IntroPage():ReactElement {
  return (
     <main className={styles.main}>
        <Intro />
     </main>
   )
}