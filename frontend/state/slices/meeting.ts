import { create } from 'zustand'
import { produce } from 'immer'
import { MeetingResponse } from '@/client/types/endpoints/meeting'
import { AttendeeResponse } from '@/client/types/endpoints/attendee'

interface MeetingWithAttendeeResponse {
   'meeting': MeetingResponse,
   'attendee': AttendeeResponse
}

type Response = undefined | MeetingWithAttendeeResponse

export type ResponseState = {
   response: Response
   setResponse(response: MeetingWithAttendeeResponse): void
}

const useResponse = create<ResponseState>((set) => ({
   response: undefined,
   setResponse: (response) => set(produce((state:ResponseState) => {
      state.response = response
   }))
}))

export default useResponse