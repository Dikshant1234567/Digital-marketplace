// "use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeRow from "./components/ROW/HomeRow";
import "@mantine/carousel/styles.css";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeRow />
      <Footer />
    </>
  );
}
