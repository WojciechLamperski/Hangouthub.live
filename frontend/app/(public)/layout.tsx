import { PropsWithChildren, ReactElement } from 'react'
import type { Metadata } from 'next'
import Header from '@/client/components/public/publicHeader'

export const metadata: Metadata = {
  title: 'Meetings'
}

export default function Layout({ children }: PropsWithChildren):ReactElement {
   return (
      <>
         <Header />
         {children}
      </>
   )
}
