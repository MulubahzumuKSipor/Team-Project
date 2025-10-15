// components/LoginForm.tsx
'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css';
import { supabase } from '../lib/supabaseClient'; // path to client helper

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // v2: signInWithPassword
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // supabase returns friendly messages for many errors
        setError(authError.message || 'Login failed. Please try again.');
        return;
      }

      // data contains session and user when successful
      // If using magic link or confirm flows, the response differs
      // Redirect to dashboard or other protected page
      router.replace('/');
    } catch (err) {
      setError('Unexpected error — please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
