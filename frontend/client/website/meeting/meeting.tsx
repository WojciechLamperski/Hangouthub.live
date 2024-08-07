'use client'
import { ReactElement, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { renderSwitch as Render } from './render'
import { components } from '../../types/components'
import useComponent from '@/state/slices/component'
import useResponse from '@/state/slices/meeting'
import usePrivateMeeting from '@/state/slices/privateMeeting'
import useMeetingAuthor from '@/client/hooks/useMeetingAuthor'
import useAttendeeDetails from '@/client/hooks/useAttendeeDetails'
import useMeetingDetails from '@/client/hooks/useMeetingDetails'
import useCreateAttendee from '@/client/hooks/useCreateAttendee'

export default function Meeting():ReactElement {

   const component = useComponent((state) => state.component)
   const setComponent = useComponent((state) => state.setComponent)
   const setResponse = useResponse((state) => state.setResponse)

   const { attendee } = useAttendeeDetails()
   const { meeting } = useMeetingDetails()
   const { newAttendee } = useCreateAttendee()

   const [ mount, setMount ] = useState(true)
   const { getToken } = useAuth()
   const pathname = usePathname()
   const id = pathname.slice(pathname.indexOf('meeting/') + 'meeting/'.length)
   const { author } = useMeetingAuthor()

   const setPrivateMeeting = usePrivateMeeting((state) => state.setPrivateMeeting)
   const privateMeeting = usePrivateMeeting((state) => state.privateMeeting)

   useEffect(() => {
      const checkMeetingStatus = async () => {
         if (await author(id)) {
            return true
         }
      }

      const getDetails = async (attendeeId:string) => {
         const detailsMeeting = await meeting(id)
         const detailsAttendee = await attendee(id, attendeeId)
         if (detailsMeeting && detailsAttendee) {
            setResponse({ meeting: detailsMeeting, attendee: detailsAttendee })
            setComponent(components.room)
         } else{
            setComponent(components.none)
         }
      }

      const joinNewAttendee = async () => {
         const attendee = await newAttendee(id)
         setPrivateMeeting({ meetingId: id, attendeeId: attendee.Attendee.AttendeeId, key: '1234', author: 'wojtek' })
         setResponse({ meeting: await meeting(id), attendee: attendee })
         setComponent(components.room)
      }

      if(mount) {
         if (privateMeeting) {
            if (id === privateMeeting.meetingId && privateMeeting.key === '1234') {
               void getDetails(privateMeeting.attendeeId)
            }
         }
         setMount(false)
      }
      else if (component !== components.room){
         // Check if this meeting exists
         checkMeetingStatus().then((status) => {
            if (status) {
               void joinNewAttendee()
            } else
               // set to lock or to message that no meeting exists
               setComponent(components.none)
         }).catch((error) => {
            console.log(error)
            setComponent(components.error)
         })
      }

   }, [ getToken, mount, setMount ])

   return Render({ component })
}