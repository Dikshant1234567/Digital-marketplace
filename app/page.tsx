import Image from "next/image";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeRow from "./components/ROW/HomeRow";
import CardsCarousel from "./components/ROW/CardCarousel";
import "@mantine/carousel/styles.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      {/* <CardsCarousel/> */}
      <HomeRow/>
    </>
  );
}
