import { ethers } from 'ethers';

export const checkWalletConnection = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Create Web3Provider instance
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      
      return {
        connected: true,
        account: accounts[0],
        signer,
        chainId: network.chainId,
        provider
      };
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      return {
        connected: false,
        error: error.message
      };
    }
  } else {
    return {
      connected: false,
      error: "No wallet detected. Please install MetaMask!"
    };
  }
};

export const disconnectWallet = async () => {
  // Note: There's no standard way to disconnect in Web3
  // We just clear our local state
  return {
    connected: false,
    account: null,
    signer: null,
    chainId: null,
    provider: null
  };
};

export const switchNetwork = async (chainId) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexValue(chainId) }],
    });
    return true;
  } catch (error) {
    console.error("Error switching network:", error);
    return false;
  }
};

// Helper function to format address
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
