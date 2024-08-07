import { create } from 'zustand'
import { produce } from 'immer'

export type ResponseState = {
   hasMeeting: boolean | undefined,
   setHasMeeting: (hasMeeting: boolean)=> void
}

const useUserHasMeeting = create<ResponseState>((set):ResponseState => ({
   hasMeeting: undefined,
   setHasMeeting: (hasMeeting) => set(produce((state:ResponseState) => {
      state.hasMeeting = hasMeeting
   }))
}))

export default useUserHasMeeting