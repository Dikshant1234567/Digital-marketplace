"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import HomeRow from "./components/ROW/HomeRow";
import CardsCarousel from "./components/ROW/CardCarousel";
import "@mantine/carousel/styles.css";
import Footer from "./components/footer/Footer";
// import { useAppSelector } from "../app/redux/hooks/index";

export default function Home() {
  // const count = useAppSelector((state) => state.counter);
  // console.log(count);
  return (
    <>
      <Navbar />
      <HomeHero />
      {/* <CardsCarousel/> */}
      <HomeRow />
      <Footer />
      {/* <button>this is {count}</button> */}
    </>
  );
}
