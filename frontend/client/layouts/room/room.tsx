'use client'
import { PropsWithChildren, ReactElement } from 'react'
import {
   MeetingProvider,
   GlobalStyles,
   LocalVideoProvider,
   RemoteVideoTileProvider,
   lightTheme
} from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider } from 'styled-components'

export default function RoomLayout({ children }:PropsWithChildren):ReactElement {
    return (
       <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <MeetingProvider>
             <RemoteVideoTileProvider>
                <LocalVideoProvider>
                   {children}
                </LocalVideoProvider>
             </RemoteVideoTileProvider>
          </MeetingProvider>
       </ThemeProvider>
    )
}