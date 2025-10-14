'use client'; 

import Link from 'next/link';

export default function CheckEmailPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center', border: '1px solid #ddd' }}>
      <h1>📧 Check Your Email!</h1>
      <p style={{ fontSize: '1.1em', marginTop: '20px' }}>
        Thank you for registering. We've sent a confirmation link to the email address you provided.
      </p>
      <p>
        **Please check your inbox (and spam folder!)** and click the link to activate your account.
      </p>
      
      <div style={{ marginTop: '40px' }}>
        <p>Didn't receive the email?</p>
        <Link href="/resend-email" style={{ color: 'blue', textDecoration: 'underline' }}>
          Click here to resend the confirmation email.
        </Link>
      </div>
      
      <p style={{ marginTop: '40px' }}>
        Once confirmed, you can <Link href="/login">log in here</Link>.
      </p>
    </div>
  );
}