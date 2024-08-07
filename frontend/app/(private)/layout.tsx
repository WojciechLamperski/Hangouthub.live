import { PropsWithChildren, ReactElement } from 'react'
import type { Metadata } from 'next'
import Header from '@/client/components/private/privateHeader'
import CheckDetails from '@/client/layouts/check'

export const metadata: Metadata = {
  title: 'HangoutHub'
}

export default function Layout({ children }: PropsWithChildren):ReactElement {
  return (
      <CheckDetails>
         <Header />
         {children}
      </CheckDetails>
  )
}
