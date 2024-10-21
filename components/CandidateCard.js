import React from 'react';

export default function Candidate({ id, name, voteCount }) {
  return (
    <div style={styles.container}>
      <div style={styles.avatar}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div style={styles.info}>
        <div style={styles.name}>{name}</div>
        {voteCount !== undefined && (
          <div style={styles.voteCount}>{voteCount} votes</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #4CAF50',
    borderRadius: '10px',
    padding: '12px 16px',
    margin: '12px 0',
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    flexShrink: 0,
    width: '60px',
    height: '60px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '20px',
  },
  info: {
    flexGrow: 1,
  },
  name: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '6px',
  },
  voteCount: {
    fontSize: '16px',
    color: '#555',
  },
};
