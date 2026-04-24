/** @format */

import { CssBaseline, Box } from "@mui/material";
import Navbar from "../../components/NavigationBar/NavigationBar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Steps from "../../components/Steps/Steps";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box>
        <Hero />
        <Features />
        <Steps />
        <CTA />
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
