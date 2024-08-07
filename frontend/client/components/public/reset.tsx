'use client'
import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Container from '@mui/material/Container'
import styles from './reset.module.css'

type Props = {
   after: string,
   back: string
}

export default function ForgotPassword({ after, back }: Props) {
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')
   const [ code, setCode ] = useState('')
   const [ incorrect, setIncorrect ] = useState('')
   const [ successfulCreation, setSuccessfulCreation ] = useState(false)
   const [ secondFactor, setSecondFactor ] = useState(false)

   const router = useRouter()
   const { isSignedIn } = useAuth()
   const { isLoaded, signIn, setActive } = useSignIn()

   if (!isLoaded) {
      return null
   }

   // If the user is already signed in,
   // redirect them to the home page
   if (isSignedIn) {
      router.push(after)
   }

   // Send the password reset code to the user's email
   async function create(e: React.FormEvent) {
      e.preventDefault()
      await signIn
         ?.create({
            strategy: 'reset_password_email_code',
            identifier: email,
         })
         .then(_ => {
            setSuccessfulCreation(true)
            setIncorrect('')
         })
         .catch(err => {
            console.error('error', err.errors[0].longMessage)
            setIncorrect(err.errors[0].longMessage)
         })
   }

   // Reset the user's password.
   // Upon successful reset, the user will be
   // signed in and redirected to the home page
   async function reset(e: React.FormEvent) {
      e.preventDefault()
      await signIn
         ?.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code,
            password,
         })
         .then(result => {
            // Check if 2FA is required
            if (result.status === 'needs_second_factor') {
               setSecondFactor(true)
               setIncorrect('')
            } else if (result.status === 'complete') {
               // Set the active session to
               // the newly created session (user is now signed in)
               setActive({ session: result.createdSessionId })
               setIncorrect('')
            } else {
               console.log(result)
            }
         })
         .catch(err => {
            console.error('error', err.errors[0].longMessage)
            setIncorrect(err.errors[0].longMessage)
         })
   }

   return (
      <section className={styles.section}>
         <Container maxWidth="xs">
            <div className={styles.wrapper}>
               <h1 className={styles.title}>
                  Reset
               </h1>

                  <h1 className={styles.forgot}>Forgot Password?</h1>
                  <form
                     className={styles.form}
                     onSubmit={!successfulCreation ? create : reset}
                  >
                     {!successfulCreation && (
                        <>
                           <label htmlFor="email">Please provide your email address</label>
                           <input
                              className={styles.input}
                              type="email"
                              placeholder="e.g john@doe.com"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                           />

                           <button className={styles.submit}>Send password reset code</button>
                           <p className={styles.error}>
                              {incorrect === undefined ? 'you made too many requests, please try again later' : incorrect}
                           </p>
                        </>
                     )}

                     {successfulCreation && (
                        <>
                           <label htmlFor="password">Enter your new password</label>
                           <input
                              className={styles.input}
                              type="password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                           />

                           <label htmlFor="password">Enter the password reset code that was sent to your email</label>
                           <input
                              className={styles.input}
                              type="text"
                              value={code}
                              onChange={e => setCode(e.target.value)}
                           />

                           <button className={styles.submit} >Reset</button>
                           <p className={styles.error}>
                              {incorrect === undefined ? 'you made too many requests, please try again later' : incorrect}
                           </p>
                        </>
                     )}
                     {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
                  </form>
                  <Link href={back}>
                     Go back to login
                  </Link>
                  <br/>
            </div>
         </Container>
      </section>
   )
}