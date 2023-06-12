import React from "react";
import pb from "@/lib/pocketbase";
// import logo from '../public/brand/logo.png';
import useLogout from "@/hooks/useLogout";

const test = () => {
  return (
    <div>
      {pb.authStore.isValid ? <div>UDH LOGIN</div> : <div>BLM LOGIN</div>}
    </div>
  );
};

export default test;
