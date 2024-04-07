"use client";
import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Image, Text, Spinner } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { ethers } from "ethers";
import contractABI from "../../abis/contractABI.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Gallery() {
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        provider
      );
      const totalSupply = await contract.totalSupply(); // assuming a totalSupply function exists

      let nfts = [];
      for (let i = 1; i <= Number(totalSupply); i++) {
        const tokenURI = await contract.tokenURI(i); // get token URI
        const tokenName = await contract.getTokenName(i); // get token name
        const tokenLabel = await contract.getTokenLabel(i); // get token label

        nfts.push({
          src: tokenURI, // use the URI directly as the image source
          owner: tokenName,
          label: tokenLabel,
        });
      }

      setNFTs(nfts);
    } catch (error) {
      console.error("Failed to load NFTs:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <SimpleGrid columns={3} spacing={4} p={20}>
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
  );
}
