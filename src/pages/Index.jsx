import { useState } from 'react';
import { Box, Input, SimpleGrid, IconButton, useClipboard, useToast } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import emojiData from '../data/emojis.json';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const { onCopy } = useClipboard('');
  const toast = useToast();

  const handleSearch = () => {
    const queryWords = searchQuery.toLowerCase().split(' ');
    const filtered = emojiData.filter(emoji => 
      queryWords.some(word => emoji.keywords.includes(word))
    );
    setFilteredEmojis(filtered);
  };

  const handleEmojiClick = (emoji) => {
    onCopy(emoji.symbol);
    toast({
      title: 'Copied!',
      description: `${emoji.symbol} has been copied to your clipboard.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Box mb={4}>
        <Input
          placeholder="Search for emojis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="lg"
          rightElement={<IconButton aria-label="Search" icon={<FaSearch />} onClick={handleSearch} />}
        />
      </Box>
      <SimpleGrid columns={{ base: 3, md: 6, lg: 10 }} spacing={4}>
        {filteredEmojis.map(emoji => (
          <IconButton
            key={emoji.slug}
            aria-label={emoji.slug}
            icon={emoji.symbol}
            fontSize="2xl"
            onClick={() => handleEmojiClick(emoji)}
            variant="ghost"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;