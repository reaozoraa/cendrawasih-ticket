import pb from "@/lib/pocketbase";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useLogout() {
  const [dummy, setDummy] = useState(0);
  const router = useRouter();
  function logout() {
    pb.authStore.clear();
    router.push("/");
    setDummy(Math.random());
  }

  return logout;
}
