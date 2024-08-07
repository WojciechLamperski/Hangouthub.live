'use client'
import { useAuth } from '@clerk/nextjs'

export default function useAttendeeDetails() {

   const { getToken } = useAuth()

   const attendee = async (meetingId:string, attendeeId:string) => {
      const response = await fetch(`${process.env.RETURN_ATTENDEE_API}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${await getToken()}`,
            },
            body: JSON.stringify({ meetingId: meetingId, attendeeId: attendeeId })
         }
      )
      const data = await response.json()
      return data.result.details
   }

   return { attendee }
}