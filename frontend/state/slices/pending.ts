import { create } from 'zustand'
import { produce } from 'immer'

export type PendingState = {
   'pending': boolean
   setPending(pending: boolean): void
}

const usePending = create<PendingState>((set) => ({
   pending: true,
   setPending: (pending) => set(produce((state:PendingState) => {
      state.pending = pending
   }))
}))

export default usePending