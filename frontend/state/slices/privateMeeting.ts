import { create } from 'zustand'
import { produce } from 'immer'

interface PrivateMeeting {
   'meetingId': string,
   'attendeeId': string,
   'author': string,
   'key': string
}

export type PrivateMeetingState = {
   privateMeeting: PrivateMeeting | undefined
   setPrivateMeeting(data: PrivateMeeting | undefined): void
}

const usePrivateMeeting = create<PrivateMeetingState>((set) => ({
   privateMeeting: undefined,
   setPrivateMeeting: (privateMeeting) => set(produce((state:PrivateMeetingState) => {
      state.privateMeeting = privateMeeting
   }))
}))

export default usePrivateMeeting