import React from "react";
import Image from "next/image";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/router";

export default function register() {
  const router = useRouter();
  async function signUp(event) {
    event.preventDefault();
    try {
      const data = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        emailVisibility: true,
        passwordConfirm: event.target.passwordConfirm.value,
      };
      const record = await pb.collection("cendrawasih_users").create(data);
      console.log(record);
      console.log("success");
      router.push("/Auth");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={signUp}>
        <div className="mb-6  mx-auto"></div>
        <div className="card-body">
          <div>
            <label>username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div>
            <label>Email</label>
            <input id="email" type="email" name="email" placeholder="email" />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="mb-4">
            <label>Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              // disabled={isLoading}
            >
              {/* {isLoading ? "Loading" : "Login"} */}
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
