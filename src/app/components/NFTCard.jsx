// src/app/components/NFTCard.js
import { Box, Image, Text } from "@chakra-ui/react";

const NFTCard = ({ src, index, owner, label }) => {
  return (
    <Box boxShadow="lg" borderRadius="md" overflow="hidden" height="">
      <Image
        src={src}
        alt={`Gallery image ${index}`}
        height="auto" // Make the image fill the height of the card
        width="auto" // Allow the width to be automatic
        objectFit="cover"
      />
      <Text
        p={2}
        color="gray.500"
        fontSize="sm"
        textAlign="center"
        borderTopWidth="1px"
      >
        minted by {owner}
      </Text>
      <Text
        p={2}
        color="gray.400"
        fontSize="sm"
        textAlign="center"
        borderTopWidth="1px"
      >
        {label}
      </Text>
    </Box>
  );
};

export default NFTCard;
