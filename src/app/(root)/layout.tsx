import { auth } from "@/lib/auth";
import { currentUser } from "@/modules/authentication/actions";
import { getAllChats } from "@/modules/chat/actions";
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar";
import Header from "@/modules/chat/components/header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/home");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/home");
  }

  const result = await getAllChats();
  const chats = Array.isArray(result?.data) ? result.data : [];


  const headerUser = {
    name: user.name ?? undefined,
    email: user.email ?? undefined,
    image: user.image ?? undefined,
    createdAt: user.createdAt,
  };

  return (
    <div className="flex h-screen min-h-screen overflow-hidden">
      <ChatSidebar user={user} chats={chats} />
      <main className="flex-1 overflow-hidden">
        <Header user={headerUser} />
        {children}
      </main>
    </div>
  );
}
