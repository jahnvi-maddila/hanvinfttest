// src/app/page.js
"use client";
import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  useDisclosure,
  Flex,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import Gallery from "./components/Gallery";
import Minter from "./components/Minter";
import { ethers } from "ethers";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tutorialUrl = "https://www.notion.so/YourTutorialLink"; // Replace with your actual tutorial link

  const checkMetaMaskAndOpenMinter = async () => {
    // Check if MetaMask is installed
    if (window.ethereum && window.ethereum.isMetaMask) {
      // MetaMask is installed, now request access to the user's wallet
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        onOpen(); // MetaMask is connected, open the Minter
      } catch (error) {
        // Handle error, such as user denying access to their wallet
        console.error("Access to MetaMask account denied:", error);
      }
    } else {
      // If MetaMask is not installed, prompt the user to install it
      alert(
        "Please install MetaMask to use the Minting feature. \nLink to install: https://metamask.io/download/"
      );
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" marginTop="4">
        <Heading as="h1" size="2xl" marginBottom="8">
          The KU Blockchain Community Gallery
        </Heading>
        <Button
          colorScheme="blue"
          onClick={checkMetaMaskAndOpenMinter}
          marginBottom="8"
        >
          Mint NFT
        </Button>
      </Box>
      <Gallery />
      <Minter isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      {/* Footer */}
      <Flex
        as="footer"
        direction="column"
        align="center"
        justify="center"
        marginTop="8"
        padding="8"
      >
        <Text fontSize="md" marginBottom="2">
          Made with 🔥 by the University of Kansas Blockchain Institute
        </Text>
        <Link href={tutorialUrl} isExternal>
          <Button colorScheme="blue" variant="outline" size="sm">
            View Tutorial
          </Button>
        </Link>
      </Flex>
    </ChakraProvider>
  );
}
