import Image from "next/image";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeRow from "./components/ROW/HomeRow";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeRow/>
      <HomeRow/>
      <HomeRow/>
      <HomeRow/>
      <HomeRow/>
      <HomeRow/>
    </>
  );
}
