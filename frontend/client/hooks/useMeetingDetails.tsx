'use client'
import { useAuth } from '@clerk/nextjs'

export default function useMeetingDetails() {

   const { getToken } = useAuth()

   const meeting = async (id:string) => {
      const response = await fetch(`${process.env.RETURN_MEETING_API}`,
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
      return data.result.details
   }

   return { meeting }
}