import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseconfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection } from "firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";
import getCurrentUserChats from "../utils/getCurrentUserChats";
import { useRouter } from "next/router";
import { async } from "@firebase/util";

const newChat = async (available_chats, user) => {
  const input_email = prompt("Enter email of chat recipient");
  const chat_exists = (email) =>
    available_chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  if (input_email && !chat_exists(input_email) && input_email !== user.email) {
    await addDoc(collection(db, "chats"), {
      users: [user.email, input_email],
    });
  }
};

const Chat = ({ mail, chatId, redirector, conversation_with }) => (
  <Flex
    p={2}
    align="center"
    _hover={{ bg: "gray.100" }}
    bgColor={conversation_with === mail ? "gray.100" : ""}
    cursor="pointer"
    onClick={() => redirector(chatId)}
  >
    {
      console.log({
        conversation_with,
        mail: mail,
        bool: conversation_with === mail
      })
    }
    <Avatar src="" marginEnd={3} />
    <Text>{mail}</Text>
  </Flex>
);

export default function Sidebar({ conversation_with }) {
  const [user] = useAuthState(auth);
  const [snapshot] = useCollection(collection(db, "chats"));
  const router = useRouter();
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const current_user_chats = getCurrentUserChats(chats, user);

  const redirect = (id) => router.push(`/chat/${id}`);

  return (
    <Flex
      w="300px"
      h={"100%"}
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        p={3}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={4} />
          <Text>{user.displayName}</Text>
        </Flex>
        <IconButton
          isRound
          size="sm"
          icon={<ArrowLeftIcon />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Button m={5} p={4} onClick={() => newChat(current_user_chats, user)}>
        New Chat
      </Button>

      <Flex
        overflow="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {typeof current_user_chats?.map === "function" &&
          current_user_chats.map((chat) => (
            <Chat
              key={Math.random()}
              chatId={chat.id}
              mail={getOtherEmail(chat.users, user)[0]}
              redirector={redirect}
              conversation_with={conversation_with}
            />
          ))}
      </Flex>
    </Flex>
  );
}
