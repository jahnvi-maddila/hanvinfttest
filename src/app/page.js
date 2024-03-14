// src/app/page.js
"use client";
import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Gallery from "./components/Gallery";
import Minter from "./components/Minter"; // Import the Minter component

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Box textAlign="center" marginTop="4">
        <Heading as="h1" size="2xl" marginBottom="8">
          The KU Blockchain Community Gallery
        </Heading>
        {/* Button to trigger the modal */}
        <Button colorScheme="teal" onClick={onOpen} marginBottom="8">
          Mint NFT
        </Button>
      </Box>
      <Gallery /> {/* Render the Gallery component */}
      <Minter isOpen={isOpen} onOpen={onOpen} onClose={onClose} />{" "}
      {/* Render the Minter component with props */}
    </ChakraProvider>
  );
}
