// src/app/page.js
"use client";
import React, { useState, useEffect } from "react";
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
import AddNetwork from "./components/AddNetwork";
import { AmoyProvider } from "./contexts/AmoyContext";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tutorialUrl =
    "https://kublockchain.notion.site/NFT-Gallery-dApp-tutorial-8ccbda66968b4b55b1808e8c2abe1272?pvs=4";
  const [showAddNetworkModal, setShowAddNetworkModal] = useState(false);

  const checkMetaMaskAndNetwork = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x13882") {
        // This is the hexadecimal chain ID for Polygon Amoy
        onOpen(); // MetaMask is connected and on the Amoy network
      } else {
        setShowAddNetworkModal(true); // Wrong network, show modal
      }
    } else {
      setShowAddNetworkModal(true); // MetaMask not installed, show modal
    }
  };

  return (
    <ChakraProvider>
      <AmoyProvider>
        <Box textAlign="center" marginTop="4">
          <Heading as="h1" size="2xl" marginBottom="8">
            The KU Blockchain Community Gallery
          </Heading>
          <Button
            colorScheme="blue"
            onClick={checkMetaMaskAndNetwork}
            marginBottom="8"
          >
            Mint NFT
          </Button>
        </Box>
        {/* <AddNetwork
          isOpen={showAddNetworkModal}
          onClose={() => setShowAddNetworkModal(false)}
        /> */}
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
      </AmoyProvider>
    </ChakraProvider>
  );
}
