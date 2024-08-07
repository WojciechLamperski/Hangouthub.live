'use client'
import { useAuth } from '@clerk/nextjs'

export default function useCreateAttendee() {

   const { getToken } = useAuth()

   const newAttendee = async (id:string) => {
      const response = await fetch(`${process.env.CREATE_ATTENDEE_API}`,
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
      return data.result.attendee
   }

   return { newAttendee }
}