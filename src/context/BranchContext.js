import React, { createContext, useState, useEffect, useContext } from 'react';

export const BranchContext = createContext();

export function BranchProvider({ children }) {
  const [branches, setBranches] = useState({
    localBranches: [],
    remoteBranches: [],
  });
  const [currentBranch, setCurrentBranch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBranches().then((data) => {
      if (data.status === 'SUCCESS') {
        setBranches({
          localBranches: data.data.localBranches,
          remoteBranches: data.data.remoteBranches,
        });
        setCurrentBranch(data.data.currentBranch);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  const changeBranch = (branch) => {
    setLoading(true);
    setError(false);
    setCurrentBranch(branch);
    fetchBranches().then((data) => {
      if (data.status === 'SUCCESS') {
        setBranches({
          localBranches: data.data.localBranches,
          remoteBranches: data.data.remoteBranches,
        });
      } else {
        setError(true);
      }
      setLoading(false);
    });
  };

  return (
    <BranchContext.Provider
      value={{ branches, currentBranch, changeBranch, loading, error }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

export function fetchBranches() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('/data/branches.json')
        .then((response) => response.json())
        .then((data) => resolve(data));
    }, 2000);
  });
}
