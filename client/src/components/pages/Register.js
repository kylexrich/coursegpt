import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setAuthError } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api/axiosInstance';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaGoogle } from 'react-icons/fa';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const authError = useSelector(state => state.auth.error);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    if (authError) dispatch(setAuthError(null));
    setCredentials(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (authError) dispatch(setAuthError(null));
    dispatch(registerUser(credentials));
  };
  const handleGoogleLogin = () => {
    if (authError) dispatch(setAuthError(null));
    window.location.href = baseUrl + '/auth/google';
  };
  const navigateToLogin = () => {
    if (authError) dispatch(setAuthError(null));
    navigate('/login');
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.800'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'white'}>
            Sign up
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={'gray.700'} boxShadow={'lg'} p={8}>
          {authError && (
            <Alert status="error" mb={5}>
              <AlertIcon />
              {authError}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel color={'white'}>First Name</FormLabel>
                    <Input
                      name="firstName"
                      type="text"
                      color={'white'}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel color={'white'}>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      type="text"
                      color={'white'}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'}>Email</FormLabel>
                <Input
                  name="email"
                  type="text"
                  color={'white'}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    color={'white'}
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={2}>
                <Button
                  bg={'blue.600'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.700',
                  }}
                  type="submit"
                >
                  Register
                </Button>
                <Text align="center" color={'white'}>
                  or
                </Text>
                <Button
                  bg={'red.600'}
                  color={'white'}
                  _hover={{
                    bg: 'red.700',
                  }}
                  onClick={handleGoogleLogin}
                  leftIcon={<FaGoogle />}
                >
                  Register with Google
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack justify="center" mt={4}>
            <Text align={'center'} color={'white'}>
              Already have an account?{' '}
              <Link onClick={navigateToLogin} color={'blue.400'}>
                Login!
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

/**
 * Majority of code written by team.
 * The visual component structure was copied and adapted from:
 * - https://chakra-templates.dev/forms/authentication
 *
 * Helped with understanding:
 * - https://reactrouter.com/en/main/hooks/use-navigate
 * - Stack Overflow / Google
 * - Chakra docs
 * - Redux docs
 */
