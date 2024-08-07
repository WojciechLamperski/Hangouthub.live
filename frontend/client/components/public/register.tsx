'use client'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useSignUp } from '@clerk/nextjs'
import Container from '@mui/material/Container'
import { navigateAnywhere } from '@/app/actions'
import styles from './register.module.css'

type Props = {
   after: string,
   login: string
}

export default function Register({ after, login }:Props ):ReactElement {

   const { isLoaded, signUp, setActive } = useSignUp()
   const [ email, setEmail ] = useState('')
   const [ username, setUsername ] = useState('')
   const [ password, setPassword ] = useState('')
   const [ incorrect, setIncorrect ] = useState('')
   const [ pendingVerification, setPendingVerification ] = useState(false)
   const [ code, setCode ] = useState('')
   const [ clicked, setClicked ] = useState(false)

   const handleSubmit = async (e:any) => {
      e.preventDefault()
      setClicked(true)
      if (!isLoaded) {
         setClicked(false)
         return
      }

      try {
         await signUp.create({
            username: username,
            emailAddress: email,
            password,
         })

         // send the email.
         await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

         // change the UI to our pending section.
         setPendingVerification(true)
         setClicked(false)
      } catch (err:any) {
         console.error('error', err.errors[0].longMessage)
         setIncorrect(err.errors[0].longMessage)
         setClicked(false)
      }
   }

   // Verify User Email Code
   const onPressVerify = async (e:any) => {
      e.preventDefault()
      setClicked(true)
      if (!isLoaded) {
         setClicked(false)
         return
      }

      try {
         const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
         })
         if (completeSignUp.status !== 'complete') {
            /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
            console.log(JSON.stringify(completeSignUp, null, 2))
            setClicked(false)
         }
         if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId })
            setClicked(false)
            void navigateAnywhere(after)
         }
      } catch (err:any) {
         // console.error(JSON.stringify(err, null, 2))
         console.error('error', err.errors[0].longMessage)
         setIncorrect(err.errors[0].longMessage)
         setClicked(false)
      }
   }

   return (
      <section className={styles.section}>
         <Container maxWidth="xs">
            <div className={styles.wrapper}>
               <h1 className={styles.title}>
                  Register
               </h1>
               {!pendingVerification && (
                  <form className={styles.form}>
                     <span className={styles.span}>
                        please fill the form below:
                     </span>
                     <div>
                        <label className={styles.label} htmlFor="email">
                           E-mail address
                        </label>
                        <input className={styles.input} onChange={(e) => setEmail(e.target.value)}
                               id="email" name="email" type="email"
                        />
                     </div>
                     <div>
                        <label className={styles.label} htmlFor="username">
                           Username
                        </label>
                        <input className={styles.input} onChange={(e) => setUsername(e.target.value)}
                               id="username" name="username" type="username"
                        />
                     </div>
                     <div>
                        <label className={styles.label} htmlFor="password">
                           Password
                        </label>
                        <input className={styles.input} onChange={(e) => setPassword(e.target.value)}
                               id="password" name="password" type="password"
                        />
                     </div>
                     <button type="submit" onClick={handleSubmit} disabled={clicked} className={styles.submit}>
                        Continue
                     </button>
                     <p className={styles.error}>
                        {incorrect === undefined ? 'you made too many requests, please try again later' : incorrect}
                     </p>
                  </form>
               )}
               {pendingVerification && (
                  <form className={styles.form}>
                     <input
                        className={styles.input}
                        value={code}
                        placeholder="Enter Verification Code..."
                        onChange={(e) => setCode(e.target.value)}
                     />
                     <button
                        type="submit"
                        onClick={onPressVerify}
                        className={styles.verify}
                        disabled={clicked}
                     >
                        Verify Email
                     </button>
                  </form>
               )}
               <div className={styles.group}>
                  <p className={styles.question}>
                     Do you already have an account?
                     <br/>
                     <Link href={login}>Click here to login.</Link>
                  </p>
               </div>
            </div>
         </Container>
      </section>
   )
}
