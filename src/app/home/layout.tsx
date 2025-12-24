import { auth } from "@/lib/auth";
import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/chat/components/header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect("/");

  const user = await currentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <Header user={user} />
      </div>

      {children}
    </div>
  );
};

export default Layout;
