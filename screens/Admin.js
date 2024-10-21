import React, { useEffect, useState } from 'react';
import CandidateForm from '../components/CandidateForm';
import VotersForm from '../components/VotersForm';

function Admin({ role, contract, web3, currentAccount }) {
  const [status, setStatus] = useState(0);
  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showVoterForm, setShowVoterForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  useEffect(() => {
    fetchElectionStatus();
    fetchCandidates();
  }, [contract]);

  const fetchElectionStatus = async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setStatus(parseInt(state));
    }
  };

  const fetchCandidates = async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      let candidatesArray = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        candidatesArray.push({ name: candidate[0], votes: candidate[1] });
      }
      setCandidateList(candidatesArray);
      setIsLoading(false);
    }
  };

  const handleElectionControl = () => {
    setShowModal(true);
  };

  const confirmElectionControl = async () => {
    if (contract) {
      try {
        if (status === 0) {
          await contract.methods.startElection().send({ from: currentAccount });
        } else if (status === 1) {
          await contract.methods.endElection().send({ from: currentAccount });
        }
        fetchElectionStatus();
      } catch (error) {
        console.error(error);
      }
    }
    setShowModal(false);
  };

  const statusText = () => {
    switch (status) {
      case 0:
        return 'Election has not started.';
      case 1:
        return 'Election is in progress.';
      case 2:
        return 'Election has ended.';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Election Status Bar */}
      <div style={statusBarStyle}>
        <h2>Election Status: {statusText()}</h2>
      </div>

      {/* Control Election */}
      {status !== 2 && (
        <div style={controlSectionStyle}>
          <button onClick={handleElectionControl} style={controlButtonStyle}>
            {status === 0 ? 'Start Election' : 'End Election'}
          </button>
        </div>
      )}

      {/* Modal for Confirmation */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <p>
              {status === 0
                ? 'Do you want to start the election?'
                : 'Do you want to end the election?'}
            </p>
            <button onClick={confirmElectionControl} style={modalButtonStyle}>
              Yes
            </button>
            <button onClick={() => setShowModal(false)} style={modalButtonStyle}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Forms or Candidates Display */}
      {status === 0 && (
        <div style={accordionContainerStyle}>
          {/* Add Voter Accordion */}
          <div style={accordionItemStyle}>
            <div
              style={accordionHeaderStyle}
              onClick={() => setShowVoterForm(!showVoterForm)}
            >
              <h3>Add Voter</h3>
              <span>{showVoterForm ? '-' : '+'}</span>
            </div>
            {showVoterForm && (
              <div style={accordionContentStyle}>
                <VotersForm
                  contract={contract}
                  web3={web3}
                  currentAccount={currentAccount}
                />
              </div>
            )}
          </div>

          {/* Add Candidate Accordion */}
          <div style={accordionItemStyle}>
            <div
              style={accordionHeaderStyle}
              onClick={() => setShowCandidateForm(!showCandidateForm)}
            >
              <h3>Add Candidate</h3>
              <span>{showCandidateForm ? '-' : '+'}</span>
            </div>
            {showCandidateForm && (
              <div style={accordionContentStyle}>
                <CandidateForm
                  contract={contract}
                  web3={web3}
                  currentAccount={currentAccount}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {status > 0 && (
        <div style={candidatesContainerStyle}>
          <h2 style={{ textAlign: 'center' }}>Candidates and Votes</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidateList.map((candidate, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{candidate.name}</td>
                  <td style={tableCellStyle}>{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const statusBarStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '15px',
  textAlign: 'center',
};

const controlSectionStyle = {
  textAlign: 'center',
  margin: '30px 0',
};

const controlButtonStyle = {
  padding: '15px 30px',
  fontSize: '18px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '400px',
  width: '80%',
};

const modalButtonStyle = {
  padding: '10px 20px',
  margin: '15px',
  fontSize: '16px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: '#007BFF',
  color: '#fff',
};

const accordionContainerStyle = {
  width: '80%',
  margin: '0 auto',
};

const accordionItemStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '15px',
  overflow: 'hidden',
};

const accordionHeaderStyle = {
  backgroundColor: '#f7f7f7',
  padding: '15px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const accordionContentStyle = {
  padding: '15px',
  backgroundColor: '#fff',
};

const candidatesContainerStyle = {
  width: '80%',
  margin: '30px auto',
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
};

export default Admin;
