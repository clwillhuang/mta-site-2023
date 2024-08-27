'use client'

import { useState } from "react";
import styles from './DeleteAccountButton.module.css'
import { signOut } from "next-auth/react";

const DeleteAccountButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        // Signout and redirect to homepage
        signOut();
      } else {
        // Handle error
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAccount} className={styles.delete}>
        {loading ? 'Deleting...' : 'Delete My Account from MTA'}
      </button>
    </div>
  );
};

export default DeleteAccountButton;
