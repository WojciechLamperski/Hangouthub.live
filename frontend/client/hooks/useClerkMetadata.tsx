'use client'
import { useAuth } from '@clerk/nextjs'
import { Obj } from '@popperjs/core'

export default function useClerkMetadata() {

   const { getToken } = useAuth()

   const metadata = async (userId: string, update?: Obj) => {
      if(typeof update !== 'undefined'){
         const response = await fetch(`${process.env.UPDATE_METADATA_API}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${await getToken()}`,
               },
               body: JSON.stringify({ userId: userId, body: update })
            }
         )
         const data = await response.json()
         return data.result
      } else{
         const response = await fetch(`${process.env.GET_METADATA_API}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${await getToken()}`,
               },
               body: JSON.stringify({ userId: userId })
            }
         )
         const data = await response.json()
         return data.result
      }
   }


   return { metadata }
}