import React from "react";
import UserButton from "@/modules/authentication/components/user-button";
import { currentUser } from "@/modules/authentication/actions";

const mainPage = async () => {
  const user = await currentUser();

  return (
    <div>
      <div className="min-h-screen">
        <UserButton user={user} />
      </div>
    </div>
  );
};

export default mainPage;