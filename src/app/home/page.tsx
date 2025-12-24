import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LandingContent from "./landing-content";

const LandingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

//   // If already logged in → go to app
//   if (session) {
//     redirect("/");
//   }

  return <LandingContent />;
};

export default LandingPage;
