// components/LoginForm.jsx (or .tsx)
'use client'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import styles from "../page.module.css"; 

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Basic validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // --- Start Login Process (Simulated) ---
    setIsLoading(true);
    console.log('Attempting login with:', { email, password });

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would handle success/failure here
      if (email === 'test@example.com' && password === 'password') {
        alert('Login Successful! (Simulated)');
        // Redirect user
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Sign In</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Error Message Display */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Email Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="you@example.com"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="********"
            required
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <div className={styles.footerLinks}>
          <Link href="#" className={styles.forgotPassword}>Forgot Password?</Link>
          <span className={styles.separator}>|</span>
          <Link href="#" className={styles.registerLink}>Create Account</Link>
        </div>
      </form>
    </div>
  );
}