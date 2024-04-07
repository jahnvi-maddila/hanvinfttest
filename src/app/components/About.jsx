// About.jsx
import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

const About = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>About this project</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader>About This Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              This is a community gallery displaying NFTs minted by members of
              the KU Blockchain Community. To mint an NFT into the gallery,
              click the Mint NFT button. You can then drag and drop an image in,
              add your name, and a label for the image. Feel free to add any
              PG-rated image and label!
            </p>
            <br />
            <p>
              To start, you can add a picture of you, your pet, or a fun place
              you&apos;ve traveled to.
            </p>
            <br />
            <p>
              If you want to build your own gallery, you can follow the tutorial
              at the link below.
            </p>
            <br />
            <Button m={2}>
              {" "}
              <Link
                href="https://github.com/KU-Blockchain/shared-nft-gallery-starter-code"
                isExternal
              >
                starter code for this project
              </Link>{" "}
            </Button>
            <br />
            <Button m={2}>
              <Link
                href="https://kublockchain.notion.site/NFT-Gallery-dApp-tutorial-8ccbda66968b4b55b1808e8c2abe1272"
                isExternal
              >
                tutorial site
              </Link>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default About;
