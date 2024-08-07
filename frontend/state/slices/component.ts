import { create } from 'zustand'
import { produce } from 'immer'
import { components } from '@/client/types/components'

export type ResponseState = {
   component: string
   setComponent(component: string): void
}

const useComponent = create<ResponseState>((set) => ({
   component: components.loading,
   setComponent: (component) => set(produce((state:ResponseState) => {
      state.component = component
   }))
}))

export default useComponent