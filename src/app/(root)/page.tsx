import ChatMessageView from "@/modules/chat/components/chat-message-view";
import { currentUser } from "@/modules/authentication/actions";
const Home = async () => {
  const user = await currentUser();

  return (
    <>
      <ChatMessageView user={user} />
    </>
  );
};

export default Home;
