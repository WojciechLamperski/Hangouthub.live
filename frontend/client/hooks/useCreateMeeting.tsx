'use client'
import { useAuth } from '@clerk/nextjs'
import fetch from 'isomorphic-fetch'
import { CreateMeetingWithAttendeeResponse } from '@/client/website/dashboard/dashboard'

export default function useCreateMeeting() {

   const { getToken } = useAuth()

   const newMeeting = async(username:string) => {
      const token = await getToken()
      // Fetching the meeting and attendee data from server application
      const response = await fetch(`${process.env.CREATE_MEETING_API}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
               mode: 'cors',
            },
            body: JSON.stringify({ username: username })
         }
      )
      const data:CreateMeetingWithAttendeeResponse = await response.json()
      return data.result
   }

   return { newMeeting }
}