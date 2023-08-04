import {
  Box,
  Center,
  HStack,
  IconButton,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setIsSearchBarVisible } from '../../../redux/uiSlice';
import { setActivePanelSearch } from '../../../redux/userSlice';

const SearchBarNav = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleClick = () => {
    dispatch(setIsSearchBarVisible(true));
    dispatch(setActivePanelSearch());
  };
  return (
    <Box
      pos="absolute"
      w="100%"
      py={0}
      color={theme.colors.chatSection.lightText}
      onClick={handleClick}
    >
      <Center>
        <HStack
          zIndex={10}
          boxShadow="lg"
          bg={theme.colors.chatSection.dark}
          borderBottomRadius="6px"
          _hover={{
            background: theme.colors.sidePanel.hoverItemBackground,
            color: theme.colors.sidePanel.text,
          }}
          p={1}
        >
          <IconButton
            colorScheme="gray.300"
            aria-label="Search for Chats/Messages"
            size="xs"
            icon={<SearchIcon color={theme.colors.chatSection.lightText} />}
          />
          <Text fontSize="sm" mx={2}>
            Press ctrl+F or cmd+F to search for Chats/Messages
          </Text>
        </HStack>
      </Center>
    </Box>
  );
};
export default SearchBarNav;