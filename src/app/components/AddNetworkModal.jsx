"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useAmoy } from "../contexts/AmoyContext";

const AddNetworkModal = () => {
  const {
    isMetaMaskInstalled,
    addPolygonAmoyNetwork,
    isNetworkModalOpen,
    toggleNetworkModal,
  } = useAmoy();

  // const addPolygonAmoyNetwork = async () => {
  //   try {
  //     // First, request account access from MetaMask
  //     await window.ethereum.request({ method: "eth_requestAccounts" });

  //     // After account access, proceed to add the Amoy network
  //     await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [
  //         {
  //           chainId: "0x13882", // Correct Chain ID for Amoy Testnet in hexadecimal
  //           chainName: "Polygon Amoy Testnet",
  //           nativeCurrency: {
  //             name: "MATIC",
  //             symbol: "MATIC", // Typically 2-4 characters long
  //             decimals: 18,
  //           },
  //           rpcUrls: ["https://rpc-amoy.polygon.technology/"],
  //           blockExplorerUrls: ["https://www.oklink.com/amoy"],
  //         },
  //       ],
  //     });
  //     onClose(); // Close the modal after adding the network
  //   } catch (error) {
  //     console.error("Failed to add Polygon Amoy network:", error);
  //   }
  // };

  // const isMetaMaskInstalled = () =>
  //   typeof window !== "undefined" &&
  //   typeof window.ethereum !== "undefined" &&
  //   window.ethereum.isMetaMask;

  return (
    <Modal isOpen={isNetworkModalOpen} onClose={toggleNetworkModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isMetaMaskInstalled()
            ? "Add Polygon Amoy Network"
            : "MetaMask Required"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {isMetaMaskInstalled() ? (
              <>
                <Text mb={4}>
                  You need to add the Polygon Amoy Network to use this feature.
                  Click here to add.
                </Text>
                <Button onClick={addPolygonAmoyNetwork} colorScheme="teal">
                  Add Amoy Network to MetaMask
                </Button>
              </>
            ) : (
              <>
                <Text mb={4}>
                  You need to install MetaMask to use this feature. Once
                  installed, return to this page and refresh.
                </Text>
                <Button
                  colorScheme="blue"
                  as="a"
                  href="https://metamask.io/download.html"
                  target="_blank"
                >
                  Install MetaMask
                </Button>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddNetworkModal;
