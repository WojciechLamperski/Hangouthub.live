'use client'
import React, {ReactElement, useState} from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { NoSsr } from '@mui/base'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { AttendeeResponse } from '../../types/endpoints/attendee'
import { MeetingResponse } from '../../types/endpoints/meeting'
import useCreateMeeting from '@/client/hooks/useCreateMeeting'
import useClerkMetadata from '@/client/hooks/useClerkMetadata'
import useDeleteMeeting from '@/client/hooks/useDeleteMeeting'
import useResponse from '../../../state/slices/meeting'
import useUserHasMeeting from '@/state/slices/hasMeeting'
import usePrivateMeeting from '@/state/slices/privateMeeting'
import usePending from '@/state/slices/pending'
import { navigateRoom } from '@/app/actions'
import Greeting from './greeting'
import styles from './dashboard.module.css'

export type CreateMeetingWithAttendeeResponse = {
   'result':MeetingWithAttendeeResponse
}

interface MeetingWithAttendeeResponse {
   'meeting': MeetingResponse,
   'attendee': AttendeeResponse
}

export default function Dashboard():ReactElement {

   const { deleteMeeting } = useDeleteMeeting()
   const { user } = useUser()
   const { newMeeting } = useCreateMeeting()
   const { metadata } = useClerkMetadata()
   const [ clicked, setClicked ] = useState(false)
   const [ error, setError ] = useState(false)
   const hasMeeting = useUserHasMeeting((state) => state.hasMeeting)
   const setHasMeeting = useUserHasMeeting((state) => state.setHasMeeting)
   const setPrivateMeeting = usePrivateMeeting((state) => state.setPrivateMeeting)
   const privateMeeting = usePrivateMeeting((state) => state.privateMeeting)
   const pending = usePending((state) => state.pending)
   const setResponse = useResponse((state) => state.setResponse)
   const setPending = usePending((state) => state.setPending)

   function handleCreate(e:React.MouseEvent<HTMLButtonElement>){
      e.preventDefault()
      setPending(true)
      setClicked(true)
      if (error){
         setError(false)
      }
      if(user && user.id && user.username) {
         if(hasMeeting && privateMeeting && privateMeeting.meetingId){
            void deleteMeeting(privateMeeting?.meetingId)
         }
         newMeeting(user.username).then((result) => {
            if (result) {
               const meetingId = result.meeting.Meeting.MeetingId
               const attendeeId = result.attendee.Attendee.AttendeeId
               setPrivateMeeting({
                  meetingId: meetingId,
                  attendeeId: attendeeId,
                  key: '1234',
                  author: 'wojtek'
               })
               metadata(user.id, {
                  meetingId: meetingId,
                  attendeeId: attendeeId,
                  key: '1234',
                  author: 'wojtek'
               }).then(() => {
                  setResponse(result)
                  setHasMeeting(true)
                  void navigateRoom(meetingId)
               })
            }
         }).catch((error) => {
            console.log(error)
            //Handle error
            setClicked(false)
            setError(true)
         })
      }
   }

   function handleJoin(){
      if(privateMeeting && privateMeeting.meetingId){
         void navigateRoom(privateMeeting.meetingId)
      }
   }

   function handleDelete(){
      setPending(true)
      if(privateMeeting?.meetingId){
         void deleteMeeting(privateMeeting?.meetingId)
      }
      setHasMeeting(false)
      setPending(false)
   }

   return (
      <>
         {(pending) ? (
               <section className={styles.progress}>
                  <CircularProgress/>
               </section>
            ) : (
               <section className={styles.section}>
                  <Container maxWidth="xs">
                     <div className={styles.wrapper}>
                        <h1 className={styles.title}>
                           Dashboard
                        </h1>
                        <Greeting/>
                        <p className={styles.info}>
                           {hasMeeting ? 'You have one active meeting' : 'You have no active meetings'}
                        </p>
                        <NoSsr>
                           <div className={styles.buttonGroup}>
                              {hasMeeting
                                 ? (
                                    <button className={styles.submit} disabled={clicked} onClick={handleJoin}>
                                       Join a meeting
                                    </button>
                                 )
                                 : (
                                    <button className={styles.submit} disabled={clicked}
                                            onClick={(e) => handleCreate(e)}>
                                       Create a meeting
                                    </button>
                                 )
                              }
                              {hasMeeting && (
                                 <button disabled={clicked} onClick={handleDelete} className={styles.delete}>
                                    Delete meeting
                                 </button>
                              )}
                           </div>
                        </NoSsr>
                        <Link className={styles.anchor} href={'/profile'}>
                           <button className={styles.submitAnchor}>
                              Edit your profile
                           </button>
                        </Link>
                        {/*Add ability to edit user profile*/}
                        <p className={styles.error}>
                           {error && ' An error occurred, please try again later'}
                        </p>
                     </div>
                  </Container>
               </section>
         )
         }
      </>
   )
}