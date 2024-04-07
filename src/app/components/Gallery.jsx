"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  SimpleGrid,
  Box,
  Button,
  Text,
  Spinner,
  Flex,
  Link,
} from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { useAmoy } from "../contexts/AmoyContext";

import { ethers } from "ethers";
import contractABI from "../../abis/contractABI.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Gallery() {
  const {
    isMetaMaskInstalled,
    currentChainId,
    checkIsOnAmoyNetwork,
    toggleNetworkModal,
    isNetworkModalOpen,
  } = useAmoy();

  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMetaMaskInstalled && checkIsOnAmoyNetwork()) {
      loadNFTs();
    } else if (isMetaMaskInstalled && !checkIsOnAmoyNetwork()) {
      toggleNetworkModal();
    }
    setIsLoading(false);
  }, [isMetaMaskInstalled, currentChainId]);

  const loadNFTs = async () => {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        provider
      );
      console.log("Contract address: ", contractAddress);
      console.log("Contract: ", contract);
      const totalSupply = await contract.totalSupply();
      console.log("Total supply: ", totalSupply);
      try {
        let nfts = [];
        for (let i = 1; i <= Number(totalSupply); i++) {
          const tokenURI = await contract.tokenURI(i);
          const tokenName = await contract.getTokenName(i);
          const tokenLabel = await contract.getTokenLabel(i);

          nfts.push({
            src: tokenURI,
            owner: tokenName,
            label: tokenLabel,
          });
        }

        setNFTs(nfts);
      } catch (error) {
        console.error("Failed to load NFTs:", error);
      }
      setIsLoading(false);
    }
  };

  const refreshGallery = () => {
    if (isMetaMaskInstalled && checkIsOnAmoyNetwork()) {
      loadNFTs();
    } else {
      toggleNetworkModal(); // If the network is not correct, open the modal
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  // Return UI with a conditional check
  if (!isMetaMaskInstalled) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        p={20}
      >
        <Text mb={4}>
          To view and interact with this gallery, please connect a MetaMask
          wallet.
        </Text>
        <Button
          as={Link}
          href="https://metamask.io/download.html"
          isExternal
          mb={4}
        >
          Download MetaMask
        </Button>
        <Text mb={4}>
          Once MetaMask is installed, return to this page and refresh the
          gallery.
        </Text>
        <Button onClick={refreshGallery}>Refresh Gallery</Button>
      </Flex>
    );
  }

  return (
    <Box position="relative" p={20}>
      <Button position="absolute" top={4} right={4} onClick={refreshGallery}>
        Refresh Gallery
      </Button>
      <SimpleGrid columns={3} spacing={4}>
        {NFTs.map((nft, index) => (
          <NFTCard
            key={index}
            src={nft.src}
            index={index + 1}
            owner={nft.owner}
            label={nft.label}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
