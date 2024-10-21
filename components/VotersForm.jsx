import React, { useState } from 'react';

export default function VotersForm({ contract, web3, currentAccount }) {
  const [address, setAddress] = useState('');

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      await contract.methods.addVoter(address).send({ from: currentAccount });
      console.log('Voter added');
    } catch (error) {
      console.log(error);
    }
    setAddress('');
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleForm} style={styles.form}>
        <h2 style={styles.heading}>Register a New Voter</h2>
        <input
          type="text"
          placeholder="Voter's Address"
          value={address}
          onChange={handleAddressChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Voter
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
  },
};
