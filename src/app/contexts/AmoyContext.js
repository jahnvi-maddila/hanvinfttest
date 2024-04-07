// AmoyContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AmoyContext = createContext(null);

export function useAmoy() {
  return useContext(AmoyContext);
}

export const AmoyProvider = ({ children }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [currentChainId, setCurrentChainId] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      setIsMetaMaskInstalled(true);
      window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
        setCurrentChainId(chainId);
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", (chainId) => {
        setCurrentChainId(chainId);
      });
    }
  }, []);

  const addPolygonAmoyNetwork = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13882",
            chainName: "Polygon Amoy Testnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-amoy.polygon.technology/"],
            blockExplorerUrls: ["https://www.oklink.com/amoy"],
          },
        ],
      });

      // After adding, re-fetch the chain ID
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setCurrentChainId(chainId);
    } catch (error) {
      console.error("Failed to add the Polygon Amoy network:", error);
    }
  };

  const checkIsOnAmoyNetwork = () => {
    return currentChainId === "0x13882";
  };

  return (
    <AmoyContext.Provider
      value={{
        isMetaMaskInstalled,
        currentChainId,
        addPolygonAmoyNetwork,
        checkIsOnAmoyNetwork,
      }}
    >
      {children}
    </AmoyContext.Provider>
  );
};
