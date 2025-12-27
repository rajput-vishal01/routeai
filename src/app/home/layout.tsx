import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { currentUser } from "@/modules/authentication/actions";
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

  if (session) {
    redirect("/");
  }

  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      {children}
    </div>
  );
}
