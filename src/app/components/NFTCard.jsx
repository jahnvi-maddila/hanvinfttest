import { Box, Image, Text } from "@chakra-ui/react";

const NFTCard = ({ src, index, owner, label }) => {
  return (
    <Box
      boxShadow="lg"
      borderRadius="md"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={src}
        alt={`Gallery image ${index}`}
        objectFit="contain"
        maxH="300px"
        width="100%"
        alignSelf="center"
      />
      <Box p={2} textAlign="center">
        <Text color="gray.500" fontSize="sm">
          minted by {owner}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

export default NFTCard;
