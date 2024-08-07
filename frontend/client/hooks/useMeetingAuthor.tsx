'use client'
import { useAuth } from '@clerk/nextjs'

export default function useMeetingAuthor() {

   const { getToken } = useAuth()

   const author = async (id:string) => {
      const response = await fetch(`${process.env.CHECK_MEETING_API}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${await getToken()}`,
            },
            body: JSON.stringify({ meetingId: id })
         }
      )
      const data = await response.json()
      return data.result.status
   }


   return { author }
}