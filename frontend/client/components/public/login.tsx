'use client'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useSignIn } from '@clerk/nextjs'
import Container from '@mui/material/Container'
import { navigateAnywhere } from '@/app/actions'
import styles from './login.module.css'

type Props = {
   after: string,
   register: string,
   reset: string
}

export default function Login({ after, register, reset }:Props):ReactElement {
   const { isLoaded, signIn, setActive } = useSignIn()
   const [ emailAddress, setEmailAddress ] = useState('')
   const [ password, setPassword ] = useState('')
   const [ incorrect, setIncorrect ] = useState('')
   const [ clicked, setClicked ] = useState(false)

   const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setClicked(true)
      if (!isLoaded) {
         return
      }
      try {
         const result = await signIn.create({
            identifier: emailAddress,
            password,
         })

         if (result.status === 'complete') {
            void navigateAnywhere(after)
            await setActive({ session: result.createdSessionId })
         }
         else {
            /*To investigate why the sign-in hasn't completed */
            console.log(result)
            setClicked(false)
         }
      } catch (err: any) {
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
                  Login
               </h1>
               <form className={styles.form}>
                  <span className={styles.span}>
                     please fill the form below:
                  </span>
                  <div>
                     <label className={styles.label} htmlFor="email">E-mail address</label>
                     <input className={styles.input} onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email"/>
                  </div>
                  <div>
                     <label className={styles.label} htmlFor="password">Password</label>
                     <input className={styles.input} onChange={(e) => setPassword(e.target.value)} id="password" name="password"
                            type="password"/>
                  </div>
                  <button className={styles.submit} onClick={(e) => {
                     void handleSubmit(e)
                  }} disabled={clicked}>
                     Continue
                  </button>
               </form>
               <Link className={styles.reset} href={reset}>forgot password? reset it here.</Link>
               <p className={styles.error}>
                  {incorrect === undefined ? 'you made too many requests, please try again later' : incorrect}
               </p>
               <div className={styles.group}>
                  <p className={styles.question}>
                     Don&apos;t have an account, yet?
                     <br/>
                     <Link href={register}>Click here to register.</Link>
                  </p>
               </div>
            </div>
         </Container>
      </section>
   )
}