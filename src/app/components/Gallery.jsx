// src/app/components/Gallery.js
import { SimpleGrid } from "@chakra-ui/react";
import NFTCard from "./NFTCard"; // Import the new component

const images = [
  { src: "/temp_nft.png", owner: "Alice" },
  { src: "/temp_nft.png", owner: "Bob" },
  { src: "/temp_nft.png", owner: "Charlie" },
];

const Gallery = () => (
  <SimpleGrid columns={3} spacing={4} p={20}>
    {images.map((image, index) => (
      <NFTCard
        key={index}
        src={image.src}
        index={index + 1}
        owner={image.owner}
      />
    ))}
  </SimpleGrid>
);

export default Gallery;
