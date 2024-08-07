import { PropsWithChildren, ReactElement } from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { CssBaseline } from '@mui/material'
import { Roboto } from 'next/font/google'
import '../public/globals.css'

const roboto = Roboto({
   weight: [ '100', '300', '400', '500', '700', '900' ],
   style: [ 'normal', 'italic' ],
   subsets: [ 'latin', 'latin-ext' ],
   display: 'swap',
})

export const metadata: Metadata = {
   title: 'Hangout Hub'
}

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

if(!publishableKey){
   throw new Error('Clerk publishable key is required')
}

export default function Layout({ children }: PropsWithChildren):ReactElement {
   return (
      <html lang="en" className={roboto.className}>
      <head>
         <link rel="stylesheet" href="/public/globals.css"/>
         <title>Hangout Hub</title>
      </head>
      <ClerkProvider publishableKey={`${publishableKey}`}>
         <CssBaseline/>
         <body id="body" className={roboto.className}>
         {children}
         </body>
      </ClerkProvider>
      </html>
   )
}