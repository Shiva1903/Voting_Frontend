import React, { useEffect, useState } from 'react';
import Vote from './Vote';
import Admin from './Admin';
import ElectionContract from '../contracts/Election.json';
import getWeb3 from '../utils/getWeb3';

export default function Home() {
  const [role, setRole] = useState(2);
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWeb3 = async () => {
    try {
      const web3Instance = await getWeb3();
      const accounts = await web3Instance.eth.getAccounts();
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3Instance);
      setCurrentAccount(accounts[0]);
      setContract(contractInstance);
      console.log('Web3 initialized');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getRole = async () => {
    if (contract && currentAccount) {
      try {
        const userRole = await contract.methods.getRole(currentAccount).call();
        setRole(parseInt(userRole));
        console.log('User role:', userRole);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    getRole();
  }, [contract]);

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loadingContainer}>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      ) : (
        <div>
          {role === 1 && (
            <Admin
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 2 && (
            <Vote
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 3 && (
            <div style={styles.unauthorizedContainer}>
              <p style={styles.unauthorizedText}>Unauthorized User</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingText: {
    fontSize: '24px',
    color: '#555',
  },
  unauthorizedContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  unauthorizedText: {
    fontSize: '24px',
    color: '#e74c3c',
  },
};
