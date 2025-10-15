'use client'; 

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '@/app/lib/supabaseClient'; 
import styles from '../page.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // --- 1. Register the User (Auth) ---
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {full_name: name},
      },
    });

    if (authError) {
      setMessage(`Error: ${authError.message}`);
      setLoading(false);
      return;
    }

    setMessage('Registration successful! Please check your email to confirm your account before logging in.');
    setLoading(false);

    router.push('/check-email')
  };

  return (
    <div className={styles.registerFormContainer}>
      <h1 className={styles.registerTitle}>Create a New Account</h1>
      
      <form onSubmit={handleRegister} className={styles.registerForm}>
          
          {/* Input Group for Name */}
          <div className={styles.registerInputGroup}>
              <label htmlFor="name" className={styles.registerLabel}>Full Name</label>
              <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className={styles.registerInputField}
              />
          </div>
          
          {/* Input Group for Email */}
          <div className={styles.registerInputGroup}>
              <label htmlFor="email" className={styles.registerLabel}>Email</label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className={styles.registerInputField}
              />
          </div>
          
          {/* Input Group for Password */}
          <div className={styles.registerInputGroup}>
              <label htmlFor="password" className={styles.registerLabel}>Password</label>
              <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className={styles.registerInputField}
              />
          </div>
          
          <button 
              type="submit" 
              disabled={loading} 
              className={styles.registerSubmitButton}
          >
              {loading ? 'Processing...' : 'Sign Up'}
          </button>
      </form>

      {message && (
          <p className={styles.registerMessage} style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
              {message}
          </p>
      )}

      <p className={styles.registerLoginText} >
          Already have an account? <Link href="/login" className={styles.registerLoginLink}>Log In here</Link>
      </p>
    </div>
  );
}