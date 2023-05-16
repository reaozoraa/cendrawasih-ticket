import pb from "@/lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "./hooks/useLogout";
import useLogin from "./hooks/useLogin";
import { useRouter } from "next/router";

export default function Auth() {
  const logout = useLogout();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: login, isLoading, isError } = useLogin();
  const router = useRouter();
  // const googleLogin = useGoogle();
  const isLoggedIn = pb.authStore.isValid;

  async function onSubmit(data) {
    login({ email: data.email, password: data.password });
    reset();
  }

  async function onGoogleLogin() {
    try {
      const authData = await pb
        .collection("cendrawasih_users")
        .authWithOAuth2({ provider: "google" });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoggedIn)
    return (
      <>
        <h1>Logged In : {pb.authStore.model.email}</h1>
        <button onClick={logout}>LogOut</button>
      </>
    );

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {isError && <p>Email atau Password Salah</p>}
      <h1>
        Silahkan Login Terlebih dahulu {isLoggedIn && pb.authStore.model.email}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email")}></input>
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        ></input>
        <br></br>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
      <button onClick={onGoogleLogin}>Login With Google</button>
    </>
  );
}
