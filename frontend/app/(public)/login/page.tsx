import { ReactElement } from 'react'
import Login from '../../../client/website/login/login'
import styles from './page.module.css'

export default function LoginMainPage():ReactElement {
   return (
       <main className={styles.main}>
          <Login/>
       </main>
    )
}