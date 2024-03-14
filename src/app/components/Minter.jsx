// src/app/components/Minter.js
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

const Minter = ({ isOpen, onOpen, onClose }) => {
  const [file, setFile] = React.useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleMint = () => {
    // Logic to handle minting the NFT
    console.log("Minting the NFT with file:", file);
    onClose(); // Close the modal after minting
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
