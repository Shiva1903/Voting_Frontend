import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';

export default function Vote({ role, contract, web3, currentAccount }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [electionState, setElectionState] = useState(0);

  const getCandidates = async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ id: i, name: candidate[0], votes: candidate[1] });
      }
      setCandidates(temp);
    }
  };

  const voteCandidate = async () => {
    try {
      if (contract && selectedCandidate !== null) {
        await contract.methods.vote(selectedCandidate).send({ from: currentAccount });
        getCandidates();
        alert('Your vote has been cast successfully!');
      } else {
        alert('Please select a candidate to vote for.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while casting your vote.');
    }
  };

  const getElectionState = async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setElectionState(parseInt(state));
    }
  };

  useEffect(() => {
    getElectionState();
    getCandidates();
  }, [contract]);

  return (
    <div style={styles.container}>
      {electionState === 0 && (
        <div style={styles.messageContainer}>
          <p style={styles.messageText}>Please wait... Election has not started yet.</p>
        </div>
      )}

      {electionState === 1 && (
        <div style={styles.voteContainer}>
          <h2 style={styles.heading}>Vote for Your Favourite Candidate</h2>
          <div style={styles.candidatesList}>
            {candidates.map((candidate) => (
              <label key={candidate.id} style={styles.candidateCard}>
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  onChange={() => setSelectedCandidate(candidate.id)}
                  style={styles.radioInput}
                />
                <div style={styles.candidateInfo}>
                  <CandidateCard id={candidate.id} name={candidate.name} />
                </div>
              </label>
            ))}
          </div>
          <button onClick={voteCandidate} style={styles.voteButton}>
            Submit Vote
          </button>
        </div>
      )}

      {electionState === 2 && (
        <div style={styles.resultsContainer}>
          <h2 style={styles.heading}>Election Results</h2>
          <div style={styles.candidatesList}>
            {candidates.map((candidate) => (
              <div key={candidate.id} style={styles.candidateResultCard}>
                <CandidateCard
                  id={candidate.id}
                  name={candidate.name}
                  voteCount={candidate.votes}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  messageContainer: {
    textAlign: 'center',
    marginTop: '100px',
  },
  messageText: {
    fontSize: '24px',
    color: '#555',
  },
  voteContainer: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  candidatesList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  candidateCard: {
    border: '2px solid #ccc',
    borderRadius: '8px',
    margin: '10px',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  radioInput: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  candidateInfo: {
    marginTop: '20px',
  },
  voteButton: {
    marginTop: '30px',
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  resultsContainer: {
    textAlign: 'center',
  },
  candidateResultCard: {
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    margin: '10px',
    padding: '10px',
    width: '200px',
    textAlign: 'center',
  },
};
