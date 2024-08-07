'use server'

import { redirect } from 'next/navigation'

export async function navigateDashboard() {
   redirect(`/dashboard`)
}

export async function navigateAnywhere(url:string) {
   redirect(`${url}`)
}

export async function navigateRoom(id:string) {
   redirect(`/meeting/${id}`)
}