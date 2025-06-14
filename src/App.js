import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import { AnimatePresence } from "framer-motion";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ProjectDetails from "./components/Dialog/ProjectDetails";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Helmet>
          {/* Primary Meta Tags */}
          <title>Chandraprakash | Cybersecurity Portfolio</title>
          <meta
            name="description"
            content="Explore real-world cybersecurity projects by Chandraprakash — phishing detection, threat hunting, log analysis, and SIEM implementation. Aiming to be a Security & SOC Analyst."
          />
          <meta
            name="keywords"
            content="Chandraprakash, Cybersecurity Portfolio, Security Analyst, SOC Analyst, SIEM, Splunk, Phishing Detection, Threat Hunting, Log Analysis, Blue Team, InfoSec, Network Security, TryHackMe, India"
          />
          <meta name="author" content="Chandraprakash C" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://chandruthehacker.github.io/" />
          <meta name="theme-color" content="#0f172a" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://chandruthehacker.github.io/"
          />
          <meta
            property="og:title"
            content="Chandraprakash | Cybersecurity Portfolio"
          />
          <meta
            property="og:description"
            content="Real-world cybersecurity projects in threat detection, phishing analysis, and SIEM. Built by Chandraprakash — aspiring Security & SOC Analyst from India."
          />
          <meta
            property="og:image"
            content="https://chandruthehacker.github.io/og-image-cybersecurity.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@chandruthehacker" />
          <meta name="twitter:creator" content="@chandruthehacker" />
          <meta
            name="twitter:url"
            content="https://chandruthehacker.github.io/"
          />
          <meta
            name="twitter:title"
            content="Chandraprakash | Cybersecurity Portfolio"
          />
          <meta
            name="twitter:description"
            content="Projects in phishing detection, threat hunting, log monitoring, and SIEM tools. Portfolio of an aspiring Security & SOC Analyst."
          />
          <meta
            name="twitter:image"
            content="https://chandruthehacker.github.io/og-image-cybersecurity.png"
          />
        </Helmet>

        <Navbar />

        <Body>
          <AnimatePresence>
            <div>
              <Hero />
              <Wrapper>
                <Skills />
                <Experience />
              </Wrapper>
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Wrapper>
                <Education />
                <Contact />
              </Wrapper>
              <Footer />

              {openModal.state && (
                <ProjectDetails
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </AnimatePresence>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
