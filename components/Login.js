import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Spinner, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

//   if (loading) {
//     return (
//       <Center h="100vh">
//         <Spinner />
//       </Center>
//     );
//   }

  // todo - redesign login
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Center h="100vh">
        <Stack
          align="center"
          bgColor="blue.200"
          p="20"
          rounded="xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor={"blue.300"}
            w="fit-content"
            p="10"
            rounded="full"
            boxShadow="md"
          >
            <ChatIcon w={100} h={100} color={"white"} />
          </Box>
          <Button
            boxShadow="md"
            p="7"
            bgColor={"whiteAlpha.800"}
            onClick={() => signInWithGoogle("", {
                prompt: 'select_account'
            })}
          >
            Sign with Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}
