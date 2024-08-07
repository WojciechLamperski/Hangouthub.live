'use client'
import React, { ReactElement, useState, useEffect, ReactNode } from 'react'
import { setConfig } from 'next/config'
import {
   useMeetingManager,
   LocalVideo,
   RemoteVideo,
   useRemoteVideoTileState,
   useLocalVideo,
   useMeetingStatus,
   MeetingStatus
} from 'amazon-chime-sdk-component-library-react'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import Container from '@mui/material/Container'
import { components } from '../../../types/components'
import Footer from './footer'
import useResponse from '../../../../state/slices/meeting'
import useComponent from '@/state/slices/component'
import usePending from '@/state/slices/pending'
import styles from './room.module.css'

type Configuration = undefined | MeetingSessionConfiguration

export default function Room():ReactElement {
   const setComponent = useComponent((state) => state.setComponent)
   const setPending = usePending((state) => state.setPending)
   const pending = usePending((state) => state.pending)

   const response = useResponse((state) => state.response)
   const [ joiningMeeting, setJoiningMeeting ] = useState<boolean>(true)
   const [ toggling, setToggling ] = useState<boolean>(false)

   const { tiles } = useRemoteVideoTileState()
   const meetingManager = useMeetingManager()
   const [ videos, setVideos ] = useState<ReactNode>()
   const meetingStatus = useMeetingStatus()
   const { toggleVideo } = useLocalVideo()

   async function endMeeting(){
      await meetingManager.stopVideoInputDevice()
      await meetingManager.audioVideo?.stopAudioInput()
      await meetingManager.audioVideo?.stopVideoInput()
      await meetingManager.meetingSession?.audioVideo.stopAudioInput()
      await meetingManager.meetingSession?.audioVideo.stopVideoInput()

      void meetingManager.audioVideo?.stopContentShare()
      void meetingManager.meetingSession?.audioVideo.stopLocalVideoTile()
      void meetingManager.meetingSession?.audioVideo.stop()
   }

   useEffect(() => {

      if(pending){
         setPending(false)
      }

      if(tiles){
         const videos = tiles.map((tileId) => <RemoteVideo tileId={tileId} />)
         setVideos(videos)
      }

      const createMeeting = async () => {
         if(response && response.meeting && response.attendee){
            // You need responses from server-side Chime API. See below for details.
            const meetingResponse =  response.meeting
            const attendeeResponse = response.attendee
            return new MeetingSessionConfiguration(meetingResponse, attendeeResponse)
         }
      }

      const configureMeeting = async () => {
         await createMeeting()
         return await createMeeting()
      }

      const joinMeeting = async () => {
         const configuration:Configuration = await configureMeeting()
         if(configuration) {
            setConfig(configuration)
            await meetingManager.join(configuration)
            await meetingManager.start()
            setToggling(true)
         }
      }

      async function toggle() {
         if(toggling){
            if (meetingStatus === MeetingStatus.Succeeded) {
               await toggleVideo()
               setToggling(false)
            }
         }
      }

      if(joiningMeeting){
         joinMeeting().then(()=>{
            if(response){
               setJoiningMeeting(false)
            }
         }).catch((error) => {
            setJoiningMeeting(false)
            console.log(error)
         })
      }

      void toggle()

      if(meetingStatus === MeetingStatus.Ended){
         void endMeeting()
         setComponent(components.end)
      }

   }, [ toggling, meetingStatus, tiles, setVideos, components.none, setComponent, meetingManager, response, joiningMeeting ])

   useEffect(()=>{

      return ()=>{
         void endMeeting()
      }

   },[])

   return (
      <section className={styles.section}>
         <Container className={styles.container} maxWidth="xl">
            <main className={styles.main}>
               <div className={styles.stream}>
                  {videos}
                  <LocalVideo />
               </div>
            </main>
         </Container>
         <Footer endMeeting={endMeeting} />
      </section>
   )
}