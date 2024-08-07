import CircularProgress from '@mui/material/CircularProgress'
import { components } from '../../types/components'
import Layout from '../../layouts/room/room'
import Room from './room/room'

type Props = {
   component: string,
}

export function renderSwitch ({ component }:Props) {
   switch (component) {
      case components.room:
         return (
            <Layout>
               <Room />
            </Layout>
         )
      case components.none:
         return (
            <div>
               <h1>This meeting doesn&apos;t exist.</h1>
               <p>Please make sure that the url you are using is a working one.</p>
            </div>
         )
      case components.end:
         return (
            <div>
               <h1>This meeting has been ended by its author.</h1>
               <p>If you want to start a new meeting, please head to dashboard</p>
            </div>
         )
      case components.error:
         return (
            <div>
               <h1>There appears to have been an error, please try again later.</h1>
            </div>
         )
      default:
         return <CircularProgress />
   }
}