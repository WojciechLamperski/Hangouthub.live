'use client'
import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import useMeetingAuthor from '@/client/hooks/useMeetingAuthor'
import useClerkMetadata from '@/client/hooks/useClerkMetadata'
import useUserHasMeeting from '@/state/slices/hasMeeting'
import usePrivateMeeting from '@/state/slices/privateMeeting'
import usePending from '@/state/slices/pending'

export default function CheckDetails({ children }:PropsWithChildren):ReactElement {

    const [ mount, setMount ] = useState(true)
    const { author } = useMeetingAuthor()
    const setHasMeeting = useUserHasMeeting((state) => state.setHasMeeting)
    const { user } = useUser()
    const setPrivateMeeting = usePrivateMeeting((state) => state.setPrivateMeeting)
    const privateMeeting = usePrivateMeeting((state) => state.privateMeeting)
    const setPending = usePending((state) => state.setPending)
    const { metadata } = useClerkMetadata()


    useEffect(() => {
        if(user){
            if (mount){
                const checkMetadata = async () => {
                    if (!privateMeeting) {
                        const data = await metadata(user.id)
                        console.log(data)
                        if(data && data.metadata && data.metadata.Meeting){
                            if (await author(data.metadata.Meeting.meetingId)) {
                                const meeting = data.metadata.Meeting
                                setPrivateMeeting({
                                    meetingId: meeting.meetingId,
                                    attendeeId: meeting.attendeeId,
                                    key: '1234',
                                    author: 'wojtek'
                                })
                                setHasMeeting(true)
                            } else {
                                // update metadata with empty object
                                await metadata(user.id, {})
                            }
                        }
                    }
                }
                const checkMeeting = async () => {
                    if (privateMeeting) {
                        if (user && privateMeeting.meetingId) {
                            const check = await author(privateMeeting.meetingId)
                            if(check === user.username){
                                setHasMeeting(true)
                            } else{
                                setPrivateMeeting(undefined)
                                setHasMeeting(false)
                            }
                        }
                    }
                }

                setPending(true)
                void checkMeeting()
                void checkMetadata()
                setPending(false)

            }
            setMount(false)
        }

    }, [ author, user ])

    return (
       <>
           { children }
       </>
    )
}