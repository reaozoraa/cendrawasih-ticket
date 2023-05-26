import { useState } from "react";
import pb from "@/lib/pocketbase";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

export default function () {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  async function login({ email, password }) {
    setLoading(true);
    const authData = await pb
      .collection("cendrawasih_users")
      .authWithPassword(email, password);
    router.push("/");
    setLoading(false);
  }
  return useMutation(login);
}
