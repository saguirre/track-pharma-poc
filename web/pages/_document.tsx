import { Html, Head, Main, NextScript } from "next/document";

const Document: React.FC = () => {
  return (
    <Html className="h-full bg-gray-100">
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
