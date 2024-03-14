// src/app/components/Gallery.js
import { SimpleGrid, Box, Image } from '@chakra-ui/react';

const images = [
  '/path-to-your-image1.jpg', // replace these with actual paths to your images
  '/path-to-your-image2.jpg',
  // ... more images
];

const Gallery = () => (
  <SimpleGrid columns={3} spacing={4}>
    {images.map((src, index) => (
      <Box key={index} boxShadow='lg' borderRadius='md'>
        <Image src={src} alt={`Gallery image ${index + 1}`} width={300} height={200} objectFit='cover' />
      </Box>
    ))}
  </SimpleGrid>
);

export default Gallery;
