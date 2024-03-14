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

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tutorialUrl = "https://www.notion.so/YourTutorialLink"; // Replace with your actual tutorial link

  return (
    <ChakraProvider>
      <Box textAlign="center" marginTop="4">
        <Heading as="h1" size="2xl" marginBottom="8">
          The KU Blockchain Community Gallery
        </Heading>
        <Button colorScheme="blue" onClick={onOpen} marginBottom="8">
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
