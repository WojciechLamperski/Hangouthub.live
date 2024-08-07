import CircularProgress from '@mui/material/CircularProgress'
import styles from './loading.module.css'

export default function LoadingPage() {
    return (
       <main className={styles.main}>
          <CircularProgress />
       </main>
    )
}