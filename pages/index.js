import { Box, Center, Spinner } from '@chakra-ui/react';
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div>
      <Head>
        <title>FireChat</title>
        <meta name="description" content="Firebase Chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box h={"100vh"}>
        <Sidebar />
      </Box>
    </div>
  )
}
