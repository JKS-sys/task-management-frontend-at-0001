import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </ Head >
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
