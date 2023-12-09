import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/Home.module.scss";
import axios from "axios";
import db from "../utils/db"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  // if(session){
  //   return(
  //     <>
  //     Heyy!! Geekies You are Signed in as {session.user.email} <br/>
  //     <button onClick={()=> signOut()}> Sign Out </button>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     Woops!! You Are Not Signed In!! <br/>
  //     <button onClick={()=> signIn()}> Sign In </button>
  //   </>
  // );
  return (
    <>
      <div>
        <Header country={"India"}/>
        {session ? "Hey!! Geekies You Are Logged In": "Woopsss!! You Are Not Logged In"}
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  // let products = await Product.find().sort({ createdAt: -1 }).lean();
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=py8gs23b32v7vb61")
  //   .then((res) => {
  //     // console.log(res)
  //     return res.data.location.country;
  //   })
    // .catch((err) => {
    //   console.log(err);
    // });
  return {
    props: {
      // products: JSON.parse(JSON.stringify(products)),
      //country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "India",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
      },
    },
  };
}
