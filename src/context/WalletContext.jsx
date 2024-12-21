import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkWalletConnection, disconnectWallet, formatAddress } from '../utils/wallet';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [walletState, setWalletState] = useState({
    connected: false,
    account: null,
    signer: null,
    chainId: null,
    provider: null,
    error: null,
    loading: false
  });

  const connectWallet = async () => {
    setWalletState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await checkWalletConnection();
      setWalletState(prev => ({
        ...prev,
        ...result,
        loading: false
      }));
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    }
  };

  const disconnect = async () => {
    const result = await disconnectWallet();
    setWalletState(prev => ({
      ...prev,
      ...result,
      error: null
    }));
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else {
          // Account changed, update state
          setWalletState(prev => ({
            ...prev,
            account: accounts[0]
          }));
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        // Chain changed, update state and refresh page as recommended by MetaMask
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const value = {
    ...walletState,
    connectWallet,
    disconnect,
    formatAddress
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
