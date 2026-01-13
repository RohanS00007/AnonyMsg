import { authClient } from "@/lib/auth-client";
// import google from "../../../public/search.png";
import google from "@/public/search.png";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

export default function GoogleSignUp() {
  async function googleOAuthLogin() {
    await authClient.signIn.social({
      provider: "google",
    });
    // axios.post("/api/sign-up");
  }
  return (
    <>
      <Button
        className="cursor-pointer hover:scale-105 active:scale-95"
        variant={"outline"}
        onClick={googleOAuthLogin}
      >
        <Image src={google} alt={"Google logo"} width={20} height={20} />
        <p>Google</p>
      </Button>
    </>
  );
}
