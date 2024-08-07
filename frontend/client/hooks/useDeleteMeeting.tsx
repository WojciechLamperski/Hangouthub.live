'use client'
import { useAuth } from '@clerk/nextjs'
import fetch from 'isomorphic-fetch'

export default function useDeleteMeeting() {

   const { getToken } = useAuth()

   const deleteMeeting = async(meetingId:string) => {
      const token = await getToken()
      // Fetching the meeting and attendee data from server application

      const response = await fetch(`${process.env.DELETE_MEETING_API}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
               mode: 'cors',
            },
            body: JSON.stringify({ meetingId: meetingId })
         }
      )
      const data = await response.json()
      return data.result
   }

   return { deleteMeeting }
}