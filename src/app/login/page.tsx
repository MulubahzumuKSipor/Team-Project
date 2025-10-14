'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../page.module.css'
import { supabase } from '../lib/supabaseClient'

interface LoginResponse {
  ok: boolean
  message?: string
  redirectTo?: string
}

export default function LoginForm(){
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(false)

  const validateEmail = (value: string) => {
    // reasonable simple validation (not overstrict)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)

    try {
      const {data, error: authError} = await supabase.auth.signInWithPassword({
        email,  
        password,

      })
      
      // If error supabase should return a friendly message
      if (authError){
        setError(authError.message || "Login failed. Please try again");
        return;
      }

      router.refresh();
      

    } catch (err) {
      // Generic fallback error
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Sign In</h2>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {error && (
          <p className={styles.error} role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="********"
            required
            disabled={isLoading}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input id="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} disabled={isLoading} />
          <label htmlFor="remember" className={styles.label} style={{ margin: 0 }}>Remember me</label>
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <div className={styles.footerLinks}>
          <Link href="#" className={styles.forgotPassword}>Forgot Password?</Link>
          <span className={styles.separator}>|</span>
          <Link href="/register" className={styles.registerLink}>Create Account</Link>
        </div>
      </form>
    </div>
  );
}
