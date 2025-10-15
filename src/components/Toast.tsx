// src/components/Toast.tsx
'use client';
import React from 'react';
import styles from '@/app/page.module.css'; // Create this CSS module next

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className={styles.toastContainer}>
      <p className={styles.message}>✅ {message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;