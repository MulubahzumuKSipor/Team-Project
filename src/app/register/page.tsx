'use client'; 

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '@/app/lib/supabaseClient'; // Adjust path as needed

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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h1>Create a New Account</h1>
      
      <form onSubmit={handleRegister}>
        {/* New Input Field for Name */}
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {/* Existing Email and Password Fields */}
        <div style={{ marginTop: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading} style={{ marginTop: '20px' }}>
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>

      {message && (
        <p style={{ color: message.startsWith('Error') ? 'red' : 'green', marginTop: '15px' }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login">Log In here</a>
      </p>
    </div>
  );
}