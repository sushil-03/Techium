import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContainer from "@/components/MainContainer";
import { ThemeProvider, useTheme } from "next-themes";
const PageLayout = ({
  isStarting = false,
  children,
}: {
  isStarting?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      enableColorScheme={false}
    >
      <Head>
        <title>Techium</title>
        <meta
          name="description"
          content="Techium Frontend with Next.js and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/imgs/favi.png" />
      </Head>
      <MainContainer>
        <NavBar isStarting={isStarting} />
        <div className="min-h-[100vh]  ">{children}</div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />{" "}
        <Footer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default PageLayout;
