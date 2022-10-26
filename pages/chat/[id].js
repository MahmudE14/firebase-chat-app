import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebaseconfig";
import getOtherEmail from "../../utils/getOtherEmail";

const Topbar = ({ conversation_with }) => (
  <Flex
    align={"center"}
    h={81}
    w="full"
    p={5}
    borderBottom="1px solid"
    borderColor="gray.100"
  >
    <Avatar src="" marginEnd={4} />
    <Heading size="lg">{conversation_with}</Heading>
  </Flex>
);

const Bottombar = ({ chat_id, user }) => {
  const [input, setInput] = useState("")
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input) {
      await addDoc(collection(db, `chats/${chat_id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp()
      })
      setInput("")
    }
  }

  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
    >
      <Input
        h={50}
        placeholder="Type a message..."
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
}

const SentMessage = ({ type, children }) => (
  <Flex
    bg={type === "sent" ? "green.100" : "blue.100"}
    alignSelf={type === "sent" ? "flex-end" : "flex-start"}
    w="fit-content"
    minWidth={100}
    rounded="lg"
    p={3}
    m={1}
  >
    {children}
  </Flex>
);

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [ messages ] = useCollectionData(q);
  const [user] = useAuthState(auth);
  const [ chat ] = useDocumentData(doc(db, "chats", id));
  let [ conversation_with ] = getOtherEmail(chat?.users ?? [], user)
  const bottomOfChat = useRef()

  useEffect(() => {
    setTimeout(bottomOfChat.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }), 100)
  }, [messages])

  return (
    <>
      <Head>
        <title>FireChat</title>
        <meta name="description" content="Firebase Chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex h="100vh">
        <Sidebar conversation_with={conversation_with} />
        <Flex flex={1} direction="column">
          <Topbar conversation_with={conversation_with} />
          <Flex flex={1} pt={4} mx={4} direction="column" overflowY="scroll" sx={{ scrollbarWidth: "none" }}>
            {
              typeof messages?.map === 'function' && messages.map(message => (
                <SentMessage
                  key={Math.random()}
                  type={message.sender === user.email ? 'sent' : ''}
                >{message.text}</SentMessage>
              ))
            }
            <div ref={bottomOfChat}></div>
          </Flex>
          <Bottombar chat_id={id} user={user} />
        </Flex>
      </Flex>
    </>
  );
}
