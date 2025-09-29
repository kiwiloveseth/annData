import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Web3Modal from 'web3modal';
import { BrowserProvider, Contract, Log } from 'ethers';
import ABI from "./abi.json";
import { CONTRACT_ADDRESS } from "./contractAddress";

// 1. Create an interface for the mintCrop parameters for clean code and type safety.
interface MintCropParams {
  owner: string;
  cropName: string;
  quality: string;
  pesticides: string;
  quantity: number;
  purchasePrice: number;
  certificateURI: string;
  imageURI: string;
}

// 2. Update the context type to use the new mintCrop function.
interface NFTContextType {
  currentAccount: string;
  error: string | null;
  connectWallet: () => Promise<void>;
  mintCrop: (owner: string,cropName: string,quality: string,pesticides: string,quantity: number,purchasePrice: number,certificateURI: string,imageURI: string) => Promise<string>; // Returns the new Token ID as a string
}

export const NFTContext = createContext<NFTContextType | undefined>(undefined);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  // --- Wallet Connection Logic (No changes needed here) ---
  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {}
    });
    setWeb3Modal(modal);
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3Modal) throw new Error("Web3Modal not initialized");
      const instance = await web3Modal.connect();
      const provider = new BrowserProvider(instance);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      setError(null);
      instance.on("accountsChanged", (accounts: string[]) => {
        setCurrentAccount(accounts[0] || '');
      });
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');
      throw err;
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      console.error('Error checking wallet:', err);
    }
  };

  const getContract = async () => {
    if (!web3Modal) throw new Error("Web3Modal not initialized");
    const instance = await web3Modal.connect();
    const provider = new BrowserProvider(instance);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, ABI.abi, signer);
  };

  // 3. Implement the new mintCrop function.
  const mintCrop = async (owner: string,cropName: string,quality: string,pesticides: string,quantity: number,purchasePrice: number,certificateURI: string,imageURI: string): Promise<string> => {
    try {
      const contract = await getContract();

      console.log("Minting crop with params:", {
        owner,
        cropName,
        quality,
        pesticides,
        quantity,
        purchasePrice,
        certificateURI,
        imageURI
      });

      // 4. Call the 'mintCrop' function on your smart contract with the correct parameters.
      const tx = await contract.mintCrop(
       owner,cropName,quality,pesticides,quantity,purchasePrice,certificateURI,imageURI
      );

      const receipt = await tx.wait();
      console.log("Miniting completed, receipt:", receipt);

      // --- Event Parsing Logic (This is a great practice to keep) ---
      // It finds the 'NFTMinted' event in the transaction logs to get the new token ID.
      return tx.hash;

    } catch (err) {
      console.error('Minting failed:', err);
      setError(err instanceof Error ? err.message : 'Minting failed');
      throw err;
    }
  };

  return (
    // 5. Provide the new mintCrop function in the context value.
    <NFTContext.Provider value={{
      currentAccount,
      error,
      connectWallet,
      mintCrop
    }}>
      {children}
    </NFTContext.Provider>
  );
};

// Custom hook remains the same
export const useNFT = () => {
  const context = useContext(NFTContext);
  if (!context) throw new Error('useNFT must be used within an NFTProvider');
  return context;
};
