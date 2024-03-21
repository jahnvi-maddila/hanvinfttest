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

const Minter = ({ isOpen, onClose }) => {
  const [file, setFile] = React.useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadToIPFS = async (file) => {
    console.log(process.env.NEXT_PUBLIC_PINATA_JWT);
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

    const metadataURI = await uploadToIPFS(file);
    if (!metadataURI) {
      console.log("File upload to IPFS failed");
      return;
    }

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x429eff45294f352378db579c50bcf6b747d4ef10";
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
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
    } else {
      console.log("MetaMask is not installed!");
      return;
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
