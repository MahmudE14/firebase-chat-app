import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebaseconfig";
import "../styles/globals.css";
import Chat from "./chat/[id]";
import { useAuthState } from "react-firebase-hooks/auth"

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner />
        </Center>
      </ChakraProvider>
    )
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    )
  }

  // return <Component {...pageProps} />
  return (
    <ChakraProvider>
      {/* <Login /> */}
      {/* <Sidebar /> */}
      {/* <Chat /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
