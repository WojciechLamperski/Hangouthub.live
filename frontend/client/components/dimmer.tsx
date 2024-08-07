import { ReactElement } from 'react'
import { Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export default function Dimmer():ReactElement  {
    return (
       <Backdrop
          sx={{ color: '#fff', zIndex: 100 }}
          open={true}
       >
          <CircularProgress sx={{ width: '12px', height: '12px' }} color="inherit" />
       </Backdrop>
    )
}