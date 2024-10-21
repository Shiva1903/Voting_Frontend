import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    console.log('Logout');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <a href="/" style={styles.logoText}>VotingApp</a>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="/home" style={styles.navLink}>Home</a></li>
        </ul>
      </nav>
      <div style={styles.userMenu}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34495e',
    padding: '10px 20px',
    color: '#ecf0f1',
  },
  logoContainer: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoText: {
    color: '#ecf0f1',
    textDecoration: 'none',
  },
  nav: {
    flexGrow: 1,
    textAlign: 'center',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'inline-flex',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '16px',
  },
  userMenu: {},
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
