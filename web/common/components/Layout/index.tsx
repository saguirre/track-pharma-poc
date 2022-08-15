import Head from "next/head";

import { Footer } from "@components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <div className="min-h-screen w-screen overflow-y-scroll overflow-x-clip scrollbar bg-white flex flex-col justify-center items-center"> */}
      <Head>
        <title>Supply Chain Traceability | Santiago Aguirre</title>
        <meta name="description" content="Bug challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <Footer />
      {/* </div> */}
    </>
  );
};
