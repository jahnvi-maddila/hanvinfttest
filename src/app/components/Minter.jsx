"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ethers } from "ethers";
import contractABI from "../../abis/contractABI.json";
import { useAmoy } from "../contexts/AmoyContext";

const Minter = ({ isOpen, onClose }) => {
  const [file, setFile] = React.useState(null);
  const { isMetaMaskInstalled, addPolygonAmoyNetwork, checkIsOnAmoyNetwork } =
    useAmoy();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // No need for fs as we're handling this in the browser environment
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();

      // Assuming the file URL is what you need for minting
      return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      return null;
    }
  };

  const handleMint = async () => {
    if (!file) {
      console.log("No file selected to mint!");
      return;
    }

    if (!isMetaMaskInstalled) {
      console.log("MetaMask is not installed!");
      return;
    }

    // Check if the user is on the Amoy network
    if (!checkIsOnAmoyNetwork()) {
      console.log("You're not connected to the Amoy network!");
      // Prompt user to switch to the Amoy network
      await addPolygonAmoyNetwork();
      return; // Optionally, you could stop the function here or recheck the network
    }

    const metadataURI = await uploadToIPFS(file);
    if (!metadataURI) {
      console.log("File upload to IPFS failed");
      return;
    }

    // Proceed with getting the provider and signer from ethers as you have MetaMask and are connected to Amoy
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = "0x429eff45294f352378db579c50bcf6b747d4ef10";
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );

    try {
      const mintTx = await contract.mintNFT(metadataURI);
      await mintTx.wait();
      console.log("NFT minted! Transaction: ", mintTx.hash);
      onClose();
    } catch (error) {
      console.error("Minting failed: ", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint your NFT</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Center
                p={16}
                bg="gray.200"
                borderRadius="md"
                {...getRootProps()}
                cursor="pointer"
              >
                <input {...getInputProps()} />
                {file ? (
                  <Text>{file.name}</Text>
                ) : (
                  <Text>
                    Drag &apos;n&apos; drop your file here, or click to select
                    files
                  </Text>
                )}
              </Center>
              <Button
                colorScheme="blue"
                isDisabled={!file}
                onClick={handleMint}
              >
                Begin Mint
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Minter;
