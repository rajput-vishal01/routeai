import ActiveChatLoader from '@/modules/messages/components/active-chat-loader'
import MessageViewWithForm from '@/modules/messages/components/message-view-form';

interface PageProps {
  params: Promise<{
    chatId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = await params;

  return (
    <>
      <ActiveChatLoader chatId={chatId} />
    
      <MessageViewWithForm chatId={chatId} />
    </>
  );
};

export default Page;