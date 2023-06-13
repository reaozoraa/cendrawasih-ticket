import {
  AppBar,
  Box,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material/";
import Layout from "./layout";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import { Component, useEffect, useState } from "react";
// import {logout} from components/layouts/Navbar
// import { logout } from "@/components/layouts/Navbar";
import useLogout from "@/hooks/useLogout";

export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  const logout = useLogout();

  async function getProfiles() {
    try {
      const resultList = await pb.collection("cendrawasih_users").getFullList({
        expand: "email,username",
      });
      setProfiles(resultList);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Layout>
      <Container
        maxWidth="auto"
        sx={{
          position: "relative",
          backgroundColor: "white",
          minHeight: "100vh",
          height: "auto",
          color: "black",
        }}
      >
        <div className="flex gap-5 bg-white px-5 py-4">
          <div className="w-1/4 h-full border">
            {profiles.map((profile) => (
              <div key={profile.id} className="flex gap-5 px-3 py-2 border-b">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="/images/pp.png" />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-black">
                  <h2 className="font-semibold">{profile.username}</h2>
                  <p>{profile.email}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1 p-2">
              <button className="w-full h-8 text-black font-semibold hover:bg-slate-400">
                My Account
              </button>
              <button
                className="w-full h-8 text-black font-semibold hover:bg-slate-400"
                onClick={logout}
              >
                Log out
              </button>
            </div>
          </div>
          {/* <div className="w-3/4 flex flex-col gap-10">
            <div className="border">
              <div className="w-full flex justify-between items-center px-5 py-2 border-b">
                <div className="flex flex-col justify-center text-black">
                  <h2 className="font-semibold">Email</h2>
                  <p>Anda bisa menambahkan maks 3 email</p>
                </div>
                <button className="w-40 h-full flex gap-4 items-center text-xl pl-2 border border-black text-black">
                  <span className="text-3xl">+</span>Email
                </button>
              </div>
              <div className="h-8"></div>
            </div>
            <div className="border">
              <div className="w-full flex justify-between items-center px-5 py-2 border-b">
                <div className="flex flex-col justify-center text-black">
                  <h2 className="font-semibold">Mobile Number</h2>
                  <p>You may use up to 3 mobile numbers</p>
                </div>
                <button className="w-40 h-full flex gap-4 items-center text-xl pl-2 border border-black text-black">
                  <span className="text-3xl">+</span>Email
                </button>
              </div>
              <div className="h-8">+6288 8888 8888</div>
            </div>
          </div> */}
        </div>
      </Container>
    </Layout>
  );
}
