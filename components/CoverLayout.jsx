import React from 'react';
import PropTypes from 'prop-types';

export default function CoverLayout({ children }) {
  return (
    <div style={styles.layoutRoot}>
      <header style={styles.header}>
        <h1 style={styles.title}>Blockchain Voting System</h1>
      </header>
      <main style={styles.mainContent}>
        {children}
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>Empowering secure and transparent elections</p>
      </footer>
    </div>
  );
}

CoverLayout.propTypes = {
  children: PropTypes.node,
};

const styles = {
  layoutRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#eaeaea',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: '20px',
    textAlign: 'center',
    color: '#ecf0f1',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: '40px 20px',
  },
  footer: {
    backgroundColor: '#2c3e50',
    padding: '10px',
    textAlign: 'center',
    color: '#bdc3c7',
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
  },
};
