'use client'
import React, { ReactElement } from 'react'
import Register from '@/client/components/public/register'

export default function RegisterMain():ReactElement {
   return (
      <>
         <Register login={'/login'} after={'/dashboard'} />
      </>
   )
}
