import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoverPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Home button clicked');
    navigate('/home');
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Blockchain Voting System</h1>
        <p style={styles.subtitle}>
          A decentralized voting system built on the Ethereum blockchain.
        </p>
        <button style={styles.button} onClick={handleClick}>
          Enter the Voting System
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#e0f7fa',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    padding: '60px 30px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '90%',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#00796b',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#555',
  },
  button: {
    padding: '14px 28px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#00796b',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
