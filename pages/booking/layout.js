import { Container, CssBaseline } from "@mui/material/";
import { useRouter } from "next/router";
import pb from "@/lib/pocketbase";

import Footer from "@/components/layouts/Footer";
import NavbarExc from "@/components/layouts/NavbarExc";

import style from "../../styles/Home.module.css";

export default function Layout({ children, stage }) {
  const router = useRouter();
  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/sign-in");
    }
  });
  return (
    <main className={style.main}>
      <CssBaseline />
      <NavbarExc stage={stage} />
      <Container
        maxWidth="auto"
        sx={{
          backgroundColor: "white",
          height: "auto",
          // position: "absolute",
          color: "black",
        }}
      >
        {children}
      </Container>
      <Footer />
    </main>
  );
}
